import React, { useState, useCallback, useEffect } from 'react';
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
import { SYSTEM_PROMPTS } from '../constants/systemPrompts';
import { DEFAULT_MODEL } from '../constants/models';

const SAMPLE_TEXT = `Artificial intelligence (AI) is transforming industries at an unprecedented pace.
From healthcare to finance, AI-powered systems are automating complex tasks, enabling faster
decision-making, and uncovering patterns in data that humans could not detect on their own.
Machine learning, a subset of AI, allows computers to learn from data without being explicitly
programmed. Deep learning, a further specialization, uses neural networks with many layers to
model complex abstractions. Recent breakthroughs in large language models have made AI capable
of generating human-quality text, writing code, and reasoning about complex problems. However,
challenges remain around safety, bias, energy consumption, and interpretability.`;

const SummarizeScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const llm = useLLM({ model: DEFAULT_MODEL });

  // Stream into summary as tokens arrive
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setSummary(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  const handleSummarize = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setSummary('');
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.summarize },
      { role: 'user', content: `Summarize the following text:\n\n${text}` },
    ]);
    // Ensure final state is set
    if (llm.response) {
      setSummary(llm.response);
    }
  }, [inputText, llm]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">

        <View style={styles.statusRow}>
          <ModelLoader
            downloadProgress={llm.downloadProgress}
            isReady={llm.isReady}
            error={llm.error ? llm.error.message : null}
            modelName="SmolLM 2.1 135M"
          />
        </View>

        <Text style={styles.label}>Text to summarize</Text>
        <TextInput
          style={styles.textArea}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Paste any article, document, or passage here…"
          placeholderTextColor="#AAA"
          multiline
          textAlignVertical="top"
          editable={!llm.isGenerating}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.sampleBtn}
            onPress={() => setInputText(SAMPLE_TEXT)}>
            <Text style={styles.sampleBtnText}>Load sample text</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.summarizeBtn,
              (!inputText.trim() || !llm.isReady || llm.isGenerating) &&
                styles.btnDisabled,
            ]}
            onPress={
              llm.isGenerating ? () => llm.interrupt() : handleSummarize
            }
            disabled={!llm.isReady || (!inputText.trim() && !llm.isGenerating)}>
            <Text style={styles.summarizeBtnText}>
              {llm.isGenerating ? '■ Stop' : 'Summarize'}
            </Text>
          </TouchableOpacity>
        </View>

        {summary.length > 0 && (
          <View style={styles.outputCard}>
            <View style={styles.outputHeader}>
              <Text style={styles.outputLabel}>Summary</Text>
              <View style={styles.onDeviceBadge}>
                <Text style={styles.onDeviceBadgeText}>⚡ On-Device</Text>
              </View>
            </View>
            <Text style={styles.outputText}>{summary}</Text>
          </View>
        )}

        {!summary && !llm.isGenerating && llm.isReady && (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              Paste any text above (article, email, document) and tap
              Summarize. The model runs entirely offline.
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 180,
    lineHeight: 21,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
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
  summarizeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  summarizeBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  onDeviceBadgeText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  outputText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  hintBox: {
    backgroundColor: '#FFFBEB',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  hintText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 20,
  },
});

export default SummarizeScreen;
