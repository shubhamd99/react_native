import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLLM } from 'react-native-executorch';
import ModelLoader from '../components/ModelLoader';
import { DEFAULT_MODEL } from '../constants/models';

const DEFAULT_SYSTEM = 'You are a helpful assistant. Answer concisely.';
const DEFAULT_USER = 'Explain what a transformer model is in 3 sentences.';

const PRESETS: { label: string; system: string; user: string }[] = [
  {
    label: '🧑‍🏫 Tutor',
    system: 'You are a patient teacher. Explain concepts simply, as if to a 12-year-old.',
    user: 'How does the internet work?',
  },
  {
    label: '🎭 Storyteller',
    system: 'You are a creative fiction writer. Write vivid, engaging short stories.',
    user: 'Write a 3-sentence story about a robot who discovers music.',
  },
  {
    label: '🩺 Advisor',
    system: 'You are a concise productivity advisor. Give 3 actionable bullet points.',
    user: 'How do I stay focused while working from home?',
  },
  {
    label: '🔬 Analyst',
    system: 'You are a data analyst. Identify patterns and give structured insights.',
    user: 'What are the pros and cons of React Native vs Flutter?',
  },
];

const PlaygroundScreen: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM);
  const [userMessage, setUserMessage] = useState(DEFAULT_USER);
  const [output, setOutput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const llm = useLLM({ model: DEFAULT_MODEL });

  // Set system prompt via configure once ready (not used for generate, but
  // good practice so the model is primed)
  useEffect(() => {
    if (llm.isReady) {
      llm.configure({ chatConfig: { systemPrompt } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llm.isReady]);

  // Stream output token-by-token
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setOutput(llm.response);
      scrollRef.current?.scrollToEnd({ animated: false });
    }
  }, [llm.response, llm.isGenerating]);

  const handleRun = useCallback(async () => {
    const sys = systemPrompt.trim();
    const usr = userMessage.trim();
    if (!sys || !usr || !llm.isReady || llm.isGenerating) {
      return;
    }
    setOutput('');
    // generate() is one-shot — pass the full messages array yourself.
    // Perfect for prompt experimentation where you don't want prior turns
    // leaking into the context.
    await llm.generate([
      { role: 'system', content: sys },
      { role: 'user', content: usr },
    ]);
    if (llm.response) {
      setOutput(llm.response);
    }
  }, [systemPrompt, userMessage, llm]);

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setSystemPrompt(preset.system);
    setUserMessage(preset.user);
    setOutput('');
  };

  const canRun = llm.isReady && !llm.isGenerating && systemPrompt.trim().length > 0 && userMessage.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">

        {/* Model status */}
        <View style={styles.statusRow}>
          <ModelLoader
            downloadProgress={llm.downloadProgress}
            isReady={llm.isReady}
            error={llm.error ? llm.error.message : null}
            modelName="SmolLM 2.1 135M"
          />
        </View>

        {/* Presets */}
        <Text style={styles.sectionLabel}>Presets</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.presetRow}>
          {PRESETS.map(p => (
            <TouchableOpacity
              key={p.label}
              style={styles.presetChip}
              onPress={() => applyPreset(p)}>
              <Text style={styles.presetText}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* System prompt */}
        <Text style={styles.sectionLabel}>System prompt</Text>
        <TextInput
          style={styles.systemInput}
          value={systemPrompt}
          onChangeText={v => { setSystemPrompt(v); setOutput(''); }}
          placeholder="e.g. You are a concise assistant…"
          placeholderTextColor="#AAA"
          multiline
          textAlignVertical="top"
          editable={!llm.isGenerating}
        />

        {/* User message */}
        <Text style={styles.sectionLabel}>User message</Text>
        <TextInput
          style={styles.userInput}
          value={userMessage}
          onChangeText={v => { setUserMessage(v); setOutput(''); }}
          placeholder="e.g. Explain recursion…"
          placeholderTextColor="#AAA"
          multiline
          textAlignVertical="top"
          editable={!llm.isGenerating}
        />

        {/* Run / Stop */}
        <TouchableOpacity
          style={[styles.runBtn, !canRun && !llm.isGenerating && styles.runBtnDisabled]}
          onPress={llm.isGenerating ? () => llm.interrupt() : handleRun}
          disabled={!llm.isReady || (!canRun && !llm.isGenerating)}>
          <Text style={styles.runBtnText}>
            {llm.isGenerating ? '■  Stop generation' : '▶  Run on-device'}
          </Text>
        </TouchableOpacity>

        {/* Output */}
        {output.length > 0 && (
          <View style={styles.outputCard}>
            <View style={styles.outputHeader}>
              <Text style={styles.outputLabel}>Response</Text>
              <View style={styles.onDeviceBadge}>
                <Text style={styles.onDeviceBadgeText}>⚡ On-Device</Text>
              </View>
            </View>
            <Text style={styles.outputText}>{output}</Text>
          </View>
        )}

        {/* Explain the API */}
        {!output && !isGenerating && llm.isReady && (
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>generate() vs sendMessage()</Text>
            <Text style={styles.tipBody}>
              This screen uses{' '}
              <Text style={styles.code}>generate(messages[])</Text>
              {' '}— you supply the full conversation array each time and the
              model has no memory between runs. Ideal for prompt experimentation.{'\n\n'}
              The Chat screen uses{' '}
              <Text style={styles.code}>sendMessage(text)</Text>
              {' '}— the hook appends each turn to an internal history so the
              model remembers prior messages.
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
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  statusRow: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
    marginTop: 4,
  },
  presetRow: {
    gap: 8,
    marginBottom: 20,
    paddingRight: 4,
  },
  presetChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  presetText: {
    fontSize: 13,
    color: '#4338CA',
    fontWeight: '600',
  },
  systemInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 80,
    lineHeight: 20,
    marginBottom: 16,
  },
  userInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 80,
    lineHeight: 20,
    marginBottom: 20,
  },
  runBtn: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  runBtnDisabled: {
    opacity: 0.4,
  },
  runBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: '#6C63FF',
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
  onDeviceBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  onDeviceBadgeText: {
    fontSize: 12,
    color: '#4338CA',
    fontWeight: '600',
  },
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#6C63FF',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  tipBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 21,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#6C63FF',
  },
});

export default PlaygroundScreen;
