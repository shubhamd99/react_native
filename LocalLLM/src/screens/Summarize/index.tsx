/**
 * @file Summarize screen component.
 * Allows users to paste long text and generate a concise summary using on-device AI.
 * Utilizes the react-native-executorch library for inference.
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
import { useSummarize } from './useSummarize';

// Constants
import { SAMPLE_TEXT } from './Summarize.constants';

// Styles
import { styles } from './Summarize.styles';

/**
 * SummarizeScreen component.
 * Renders a text area for input and an output card for the generated summary.
 * 
 * @returns {React.FC} The rendered Summarize screen.
 */
const SummarizeScreen: React.FC = () => {
  const {
    inputText,
    setInputText,
    summary,
    llm,
    handleSummarize,
  } = useSummarize();

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

export default SummarizeScreen;
