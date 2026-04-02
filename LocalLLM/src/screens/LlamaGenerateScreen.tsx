/**
 * LlamaGenerateScreen — demonstrates generateText (non-streaming) from Vercel AI SDK
 * using @react-native-ai/llama as the provider.
 *
 * Contrasts with LlamaChatScreen (streamText) to show both API surfaces.
 *
 * Three preset tasks show different system-prompt patterns:
 *   1. Summarize — bullet-point summary
 *   2. Q&A       — direct factual answer
 *   3. Translate — translate to a chosen language
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { generateText } from 'ai';
import { useLlamaContext } from '../context/LlamaContext';
import LlamaModelLoader from '../components/LlamaModelLoader';

type TaskId = 'summarize' | 'qa' | 'translate';

interface Task {
  id: TaskId;
  label: string;
  icon: string;
  systemPrompt: string;
  buildPrompt: (input: string, lang?: string) => string;
  placeholder: string;
}

const TASKS: Task[] = [
  {
    id: 'summarize',
    label: 'Summarize',
    icon: '📝',
    systemPrompt:
      'You are a summarization expert. Summarize in 3–5 bullet points. Start with bullets immediately.',
    buildPrompt: text => `Summarize:\n\n${text}`,
    placeholder: 'Paste any article, email, or document…',
  },
  {
    id: 'qa',
    label: 'Q&A',
    icon: '🤔',
    systemPrompt:
      'You are a knowledgeable assistant. Answer concisely in 2–3 sentences.',
    buildPrompt: text => text,
    placeholder: 'Ask any question…',
  },
  {
    id: 'translate',
    label: 'Translate',
    icon: '🌍',
    systemPrompt:
      'You are a professional translator. Output only the translated text.',
    buildPrompt: (text, lang) =>
      `Translate to ${lang ?? 'Spanish'}:\n\n${text}`,
    placeholder: 'Enter text to translate…',
  },
];

const TRANSLATE_LANGS = ['Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Arabic'];

const SAMPLE_INPUTS: Record<TaskId, string> = {
  summarize:
    'React Native is a framework for building native mobile apps using React and JavaScript. It compiles to native code, giving apps a look and feel consistent with platform conventions. It shares most code between iOS and Android while allowing platform-specific customizations. Hot reloading speeds up development cycles. React Native is used by companies like Facebook, Airbnb, and Shopify.',
  qa: 'What is the difference between concurrency and parallelism?',
  translate: 'The quick brown fox jumps over the lazy dog.',
};

const LlamaGenerateScreen: React.FC = () => {
  const { model, isReady } = useLlamaContext();
  const [activeTask, setActiveTask] = useState<TaskId>('summarize');
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokenCount, setTokenCount] = useState<{ input: number; output: number } | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const task = TASKS.find(t => t.id === activeTask)!;

  const handleGenerate = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !model || !isReady || isGenerating) {
      return;
    }

    setOutput('');
    setTokenCount(null);
    setIsGenerating(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      /**
       * generateText — waits for the full response before returning.
       * Returns: { text, usage: { promptTokens, completionTokens } }
       *
       * Use when you don't need streaming (summarize, translate, one-shot Q&A).
       * For streaming UI, use streamText (see LlamaChatScreen).
       */
      const result = await generateText({
        model,
        messages: [
          { role: 'system', content: task.systemPrompt },
          {
            role: 'user',
            content: task.buildPrompt(
              text,
              activeTask === 'translate' ? targetLang : undefined,
            ),
          },
        ],
        abortSignal: controller.signal,
      });

      setOutput(result.text);
      setTokenCount({
        input: result.usage.inputTokens ?? 0,
        output: result.usage.outputTokens ?? 0,
      });
    } catch (e: unknown) {
      if (!(e instanceof Error && e.name === 'AbortError')) {
        setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
      }
    } finally {
      abortRef.current = null;
      setIsGenerating(false);
    }
  }, [inputText, model, isReady, isGenerating, task, activeTask, targetLang]);

  const switchTask = (id: TaskId) => {
    setActiveTask(id);
    setInputText('');
    setOutput('');
    setTokenCount(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">

        {/* Model status */}
        <View style={styles.statusRow}>
          <LlamaModelLoader compact />
        </View>

        {/* Library info */}
        <View style={styles.infoStrip}>
          <Text style={styles.infoText}>
            @react-native-ai/llama · GGUF · Vercel AI SDK v6 · generateText
          </Text>
        </View>

        {/* Task tabs */}
        <View style={styles.tabRow}>
          {TASKS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[styles.tab, activeTask === t.id && styles.tabActive]}
              onPress={() => switchTask(t.id)}>
              <Text style={styles.tabIcon}>{t.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTask === t.id && styles.tabLabelActive,
                ]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Language picker for translate */}
        {activeTask === 'translate' && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.langPickerContent}>
            {TRANSLATE_LANGS.map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.langChip,
                  targetLang === lang && styles.langChipActive,
                ]}
                onPress={() => setTargetLang(lang)}>
                <Text
                  style={[
                    styles.langChipText,
                    targetLang === lang && styles.langChipTextActive,
                  ]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Input */}
        <TextInput
          style={styles.textArea}
          value={inputText}
          onChangeText={text => {
            setInputText(text);
            setOutput('');
            setTokenCount(null);
          }}
          placeholder={task.placeholder}
          placeholderTextColor="#AAA"
          multiline
          textAlignVertical="top"
          editable={!isGenerating}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.sampleBtn}
            onPress={() => setInputText(SAMPLE_INPUTS[activeTask])}>
            <Text style={styles.sampleBtnText}>Load sample</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.generateBtn,
              (!inputText.trim() || !isReady || isGenerating) && styles.btnDisabled,
            ]}
            onPress={isGenerating ? () => abortRef.current?.abort() : handleGenerate}
            disabled={!isReady || (!inputText.trim() && !isGenerating)}>
            {isGenerating ? (
              <View style={styles.generatingRow}>
                <ActivityIndicator size="small" color="#FFF" />
                <Text style={styles.generateBtnText}>Stop</Text>
              </View>
            ) : (
              <Text style={styles.generateBtnText}>
                {task.icon} Run {task.label}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Output */}
        {output.length > 0 && (
          <View style={styles.outputCard}>
            <View style={styles.outputHeader}>
              <Text style={styles.outputLabel}>
                {task.icon} {task.label} result
              </Text>
              <View style={styles.sdkBadge}>
                <Text style={styles.sdkBadgeText}>generateText</Text>
              </View>
            </View>
            <Text style={styles.outputText}>{output}</Text>
            {tokenCount && (
              <View style={styles.tokenRow}>
                <Text style={styles.tokenText}>
                  ↑ {tokenCount.input} prompt tokens · ↓ {tokenCount.output} output tokens
                </Text>
              </View>
            )}
          </View>
        )}

        {/* API explanation card */}
        {!output && !isGenerating && (
          <View style={styles.explainCard}>
            <Text style={styles.explainTitle}>
              generateText vs streamText
            </Text>
            <Text style={styles.explainText}>
              <Text style={styles.bold}>generateText</Text>
              {' '}waits for the full response before returning — ideal for one-shot tasks like summarization or translation where you want the complete answer at once.{'\n\n'}
              <Text style={styles.bold}>streamText</Text>
              {' '}returns tokens as they are generated — ideal for chat UIs where you want the response to appear progressively (see the Chat screen).
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  statusRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  infoStrip: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FED7AA',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 11,
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  tabActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  tabLabelActive: {
    color: '#C2410C',
  },
  langPickerContent: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  langChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  langChipActive: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  langChipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  langChipTextActive: {
    color: '#C2410C',
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 160,
    lineHeight: 21,
    marginHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  sampleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  sampleBtnText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  generateBtn: {
    flex: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F97316',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  generateBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  generatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    shadowColor: '#F97316',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  outputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sdkBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  sdkBadgeText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  tokenRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0E0D0',
  },
  tokenText: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  explainCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F97316',
  },
  explainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  explainText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 21,
  },
  bold: {
    fontWeight: '700',
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default LlamaGenerateScreen;
