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

const SAMPLE_CODE = `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`;

const CodeExplainerScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');

  const llm = useLLM({ model: DEFAULT_MODEL });

  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setExplanation(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  const handleExplain = useCallback(async () => {
    const text = code.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setExplanation('');
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.code },
      {
        role: 'user',
        content: `Explain the following code:\n\n\`\`\`\n${text}\n\`\`\``,
      },
    ]);
    if (llm.response) {
      setExplanation(llm.response);
    }
  }, [code, llm]);

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

        <Text style={styles.label}>Paste your code</Text>
        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={text => {
            setCode(text);
            setExplanation('');
          }}
          placeholder="// Paste any code snippet here…"
          placeholderTextColor="#888"
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          editable={!llm.isGenerating}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.sampleBtn}
            onPress={() => {
              setCode(SAMPLE_CODE);
              setExplanation('');
            }}>
            <Text style={styles.sampleBtnText}>Load sample</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.explainBtn,
              (!code.trim() || !llm.isReady || llm.isGenerating) &&
                styles.btnDisabled,
            ]}
            onPress={llm.isGenerating ? () => llm.interrupt() : handleExplain}
            disabled={!llm.isReady || (!code.trim() && !llm.isGenerating)}>
            <Text style={styles.explainBtnText}>
              {llm.isGenerating ? '■ Stop' : 'Explain code'}
            </Text>
          </TouchableOpacity>
        </View>

        {explanation.length > 0 && (
          <View style={styles.outputCard}>
            <View style={styles.outputHeader}>
              <Text style={styles.outputLabel}>Explanation</Text>
              <View style={styles.onDeviceBadge}>
                <Text style={styles.onDeviceBadgeText}>⚡ On-Device</Text>
              </View>
            </View>
            <Text style={styles.outputText}>{explanation}</Text>
          </View>
        )}

        {!explanation && !llm.isGenerating && llm.isReady && (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Tips</Text>
            {TIPS.map((tip, i) => (
              <Text key={i} style={styles.tipText}>
                • {tip}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const TIPS = [
  'Works with any language — JS, Python, Go, Rust, SQL…',
  'Paste a full function or a class method',
  'Ask about algorithms, patterns, or potential bugs',
  'Runs 100% offline — your code never leaves the device',
];

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
  codeInput: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 14,
    fontSize: 13,
    color: '#CDD6F4',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    minHeight: 200,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#313244',
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
  explainBtn: {
    flex: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  explainBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#EF4444',
    shadowOpacity: 0.08,
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
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    gap: 6,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7F1D1D',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 20,
  },
});

export default CodeExplainerScreen;
