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

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
  { code: 'French', label: 'French', flag: '🇫🇷' },
  { code: 'German', label: 'German', flag: '🇩🇪' },
  { code: 'Japanese', label: 'Japanese', flag: '🇯🇵' },
  { code: 'Chinese (Simplified)', label: 'Chinese', flag: '🇨🇳' },
  { code: 'Hindi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'Arabic', label: 'Arabic', flag: '🇸🇦' },
  { code: 'Portuguese', label: 'Portuguese', flag: '🇧🇷' },
];

const TranslateScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES[0]);
  const [translation, setTranslation] = useState('');

  const llm = useLLM({ model: DEFAULT_MODEL });

  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setTranslation(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  const handleTranslate = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setTranslation('');
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.translate },
      {
        role: 'user',
        content: `Translate the following text into ${targetLang.code}. Output only the translation:\n\n${text}`,
      },
    ]);
    if (llm.response) {
      setTranslation(llm.response);
    }
  }, [inputText, targetLang, llm]);

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

        {/* Source language input */}
        <View style={styles.langCard}>
          <View style={styles.langHeader}>
            <Text style={styles.langLabel}>🇺🇸 English (source)</Text>
          </View>
          <TextInput
            style={styles.langInput}
            value={inputText}
            onChangeText={text => {
              setInputText(text);
              setTranslation('');
            }}
            placeholder="Enter text to translate…"
            placeholderTextColor="#AAA"
            multiline
            textAlignVertical="top"
            editable={!llm.isGenerating}
          />
        </View>

        {/* Target language picker */}
        <View style={styles.targetRow}>
          <Text style={styles.arrowIcon}>↓</Text>
          <Text style={styles.targetLabel}>Translate to:</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.langPicker}
          contentContainerStyle={styles.langPickerContent}>
          {LANGUAGES.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langChip,
                targetLang.code === lang.code && styles.langChipActive,
              ]}
              onPress={() => {
                setTargetLang(lang);
                setTranslation('');
              }}>
              <Text style={styles.langChipFlag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.langChipText,
                  targetLang.code === lang.code && styles.langChipTextActive,
                ]}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Translate button */}
        <TouchableOpacity
          style={[
            styles.translateBtn,
            (!inputText.trim() || !llm.isReady || llm.isGenerating) &&
              styles.btnDisabled,
          ]}
          onPress={
            llm.isGenerating ? () => llm.interrupt() : handleTranslate
          }
          disabled={!llm.isReady || (!inputText.trim() && !llm.isGenerating)}>
          <Text style={styles.translateBtnText}>
            {llm.isGenerating
              ? '■ Stop'
              : `Translate to ${targetLang.flag} ${targetLang.label}`}
          </Text>
        </TouchableOpacity>

        {/* Output */}
        {translation.length > 0 && (
          <View style={styles.outputCard}>
            <View style={styles.outputHeader}>
              <Text style={styles.outputLang}>
                {targetLang.flag} {targetLang.label}
              </Text>
              <View style={styles.onDeviceBadge}>
                <Text style={styles.onDeviceBadgeText}>⚡ On-Device</Text>
              </View>
            </View>
            <Text style={styles.outputText}>{translation}</Text>
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
  langCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 4,
  },
  langHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  langLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  langInput: {
    padding: 14,
    fontSize: 15,
    color: '#1A1A1A',
    minHeight: 110,
    lineHeight: 22,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: '700',
  },
  targetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  langPicker: {
    marginBottom: 16,
  },
  langPickerContent: {
    gap: 8,
    paddingRight: 4,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  langChipActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  langChipFlag: {
    fontSize: 16,
  },
  langChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  langChipTextActive: {
    color: '#065F46',
    fontWeight: '700',
  },
  translateBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  translateBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  outputCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    shadowColor: '#10B981',
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
  outputLang: {
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
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 26,
  },
});

export default TranslateScreen;
