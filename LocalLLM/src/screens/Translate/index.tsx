/**
 * @file Translate screen component.
 * Provides an on-device translation interface supporting multiple target languages.
 * Uses the react-native-executorch library for local inference.
 */

// React
import React from 'react';

// React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Components
import ModelLoader from '../../components/ModelLoader';

// Hooks
import { useTranslate } from './useTranslate';

// Constants
import { LANGUAGES } from './Translate.constants';

// Styles
import { styles } from './Translate.styles';

/**
 * TranslateScreen component.
 * Renders a source text input, a horizontal language picker, and a translation output card.
 * 
 * @returns {React.FC} The rendered Translate screen.
 */
const TranslateScreen: React.FC = () => {
  const {
    inputText,
    setInputText,
    targetLang,
    setTargetLang,
    translation,
    setTranslation,
    llm,
    handleTranslate,
  } = useTranslate();

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

export default TranslateScreen;
