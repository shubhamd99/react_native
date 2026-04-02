/**
 * @file LlamaChat screen component.
 * Provides a conversational chat interface using the @react-native-ai/llama library
 * and the Vercel AI SDK for streaming token-by-token responses.
 */

// React
import React, { useCallback } from 'react';

// React Native
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import LlamaModelLoader from '../../components/LlamaModelLoader';
import MessageBubble from '../../components/MessageBubble';

// Hooks
import { useLlamaChat } from './useLlamaChat';

// Constants
import { SUGGESTIONS } from './LlamaChat.constants';

// Types
import { ChatMessage } from '../../types';

// Styles
import { styles } from './LlamaChat.styles';

/**
 * LlamaChatScreen component.
 * Renders a full-screen chat interface specifically for llama.rn based models.
 * 
 * @returns {React.FC} The rendered LlamaChat screen.
 */
const LlamaChatScreen: React.FC = () => {
  const {
    messages,
    inputText,
    setInputText,
    isGenerating,
    listRef,
    isReady,
    sendMessage,
    stopGeneration,
    clearChat,
  } = useLlamaChat();

  /**
   * Renders an individual message bubble.
   * 
   * @param {Object} props - Render item props.
   * @param {ChatMessage} props.item - The message data.
   */
  const renderItem: ListRenderItem<ChatMessage> = useCallback(
    ({ item }) => <MessageBubble role={item.role} content={item.content} />,
    [],
  );

  /**
   * Key extractor for the message list.
   * 
   * @param {ChatMessage} item - The message data.
   * @returns {string} Unique key for the message.
   */
  const keyExtractor = useCallback((item: ChatMessage) => item.id, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>

      {/* Status bar */}
      <View style={styles.statusBar}>
        <LlamaModelLoader compact />
        {messages.length > 0 && (
          <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Library info strip */}
      <View style={styles.infoStrip}>
        <Text style={styles.infoText}>
          @react-native-ai/llama · GGUF · Vercel AI SDK v6 · streamText
        </Text>
      </View>

      {/* Messages / empty state */}
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🦙</Text>
          <Text style={styles.emptyTitle}>Chat with llama.rn</Text>
          <Text style={styles.emptySubtitle}>
            GGUF model via Callstack's @react-native-ai/llama.{'\n'}
            Tokens stream using Vercel AI SDK's streamText.
          </Text>
          <View style={styles.suggestions}>
            {SUGGESTIONS.map(s => (
              <TouchableOpacity
                key={s}
                style={styles.suggestion}
                onPress={() => setInputText(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={isReady ? 'Message…' : 'Loading model…'}
          placeholderTextColor="#AAA"
          multiline
          maxLength={2000}
          editable={isReady && !isGenerating}
        />
        {isGenerating ? (
          <TouchableOpacity
            style={[styles.sendBtn, styles.stopBtn]}
            onPress={stopGeneration}>
            <Text style={styles.sendBtnText}>■</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!inputText.trim() || !isReady) && styles.sendBtnDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || !isReady}>
            <Text style={styles.sendBtnText}>↑</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LlamaChatScreen;
