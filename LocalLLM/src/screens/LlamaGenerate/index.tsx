/**
 * @file LlamaGenerate screen component.
 * Demonstrates the use of the Vercel AI SDK's generateText (non-streaming) function
 * with the @react-native-ai/llama library as the backend.
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
  ActivityIndicator,
} from 'react-native';

// Components
import LlamaModelLoader from '../../components/LlamaModelLoader';

// Hooks
import { useLlamaGenerate } from './useLlamaGenerate';

// Constants
import {
  TASKS,
  TRANSLATE_LANGS,
  SAMPLE_INPUTS,
} from './LlamaGenerate.constants';

// Styles
import { styles } from './LlamaGenerate.styles';

/**
 * LlamaGenerateScreen component.
 * Renders a task-based interface for performing one-shot LLM operations.
 * 
 * @returns {React.FC} The rendered LlamaGenerate screen.
 */
const LlamaGenerateScreen: React.FC = () => {
  const {
    activeTask,
    inputText,
    setInputText,
    targetLang,
    setTargetLang,
    output,
    isGenerating,
    tokenCount,
    abortRef,
    isReady,
    task,
    handleGenerate,
    switchTask,
  } = useLlamaGenerate();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
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
              onPress={() => switchTask(t.id)}
            >
              <Text style={styles.tabIcon}>{t.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTask === t.id && styles.tabLabelActive,
                ]}
              >
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
            contentContainerStyle={styles.langPickerContent}
          >
            {TRANSLATE_LANGS.map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.langChip,
                  targetLang === lang && styles.langChipActive,
                ]}
                onPress={() => setTargetLang(lang)}
              >
                <Text
                  style={[
                    styles.langChipText,
                    targetLang === lang && styles.langChipTextActive,
                  ]}
                >
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
            onPress={() => setInputText(SAMPLE_INPUTS[activeTask])}
          >
            <Text style={styles.sampleBtnText}>Load sample</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.generateBtn,
              (!inputText.trim() || !isReady || isGenerating) &&
                styles.btnDisabled,
            ]}
            onPress={
              isGenerating ? () => abortRef.current?.abort() : handleGenerate
            }
            disabled={!isReady || (!inputText.trim() && !isGenerating)}
          >
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
                  ↑ {tokenCount.input} prompt tokens · ↓ {tokenCount.output}{' '}
                  output tokens
                </Text>
              </View>
            )}
          </View>
        )}

        {/* API explanation card */}
        {!output && !isGenerating && (
          <View style={styles.explainCard}>
            <Text style={styles.explainTitle}>generateText vs streamText</Text>
            <Text style={styles.explainText}>
              <Text style={styles.bold}>generateText</Text> waits for the full
              response before returning — ideal for one-shot tasks like
              summarization or translation where you want the complete answer at
              once.{'\n\n'}
              <Text style={styles.bold}>streamText</Text> returns tokens as they
              are generated — ideal for chat UIs where you want the response to
              appear progressively (see the Chat screen).
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LlamaGenerateScreen;
