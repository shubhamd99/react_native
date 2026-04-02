/**
 * @file Playground screen component.
 * Provides an interactive environment to experiment with different system prompts and user messages.
 * Uses the react-native-executorch library's generate() function for stateless inference.
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
import { usePlayground } from './usePlayground';

// Constants
import { PRESETS } from './Playground.constants';

// Styles
import { styles } from './Playground.styles';

/**
 * PlaygroundScreen component.
 * Renders an interface for configuring and testing LLM behavior with presets and custom prompts.
 * 
 * @returns {React.FC} The rendered Playground screen.
 */
const PlaygroundScreen: React.FC = () => {
  const {
    systemPrompt,
    setSystemPrompt,
    userMessage,
    setUserMessage,
    output,
    setOutput,
    scrollRef,
    llm,
    handleRun,
    applyPreset,
    canRun,
  } = usePlayground();

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
        {!output && !llm.isGenerating && llm.isReady && (
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

export default PlaygroundScreen;
