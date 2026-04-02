/**
 * @file Chat screen component.
 * Provides a conversational interface using the react-native-executorch library.
 * Features include real-time message streaming, model loading status, and suggested prompts.
 */

// React
import React, { useCallback } from 'react';

// React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';

// Components
import ModelLoader from '../../components/ModelLoader';
import MessageBubble from '../../components/MessageBubble';

// Hooks
import { useChat } from './useChat';

// Constants
import { SUGGESTIONS } from './Chat.constants';

// Types
import { ChatMessage } from '../../types';

// Styles
import { styles } from './Chat.styles';

/**
 * ChatScreen component.
 * Renders a full-screen chat interface with a message list and input bar.
 * 
 * @returns {React.FC} The rendered Chat screen.
 */
const ChatScreen: React.FC = () => {
  const {
    messages,
    inputText,
    setInputText,
    listRef,
    llm,
    sendMessage,
    clearChat,
  } = useChat();

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
      {/* Model status bar */}
      <View style={styles.statusBar}>
        <ModelLoader
          downloadProgress={llm.downloadProgress}
          isReady={llm.isReady}
          error={llm.error ? llm.error.message : null}
          modelName="SmolLM 2.1 135M"
        />
        {messages.length > 0 && (
          <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Message list */}
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>Chat with a local LLM</Text>
          <Text style={styles.emptySubtitle}>
            All inference runs on-device.{'\n'}No API key or internet required.
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
          placeholder={llm.isReady ? 'Message…' : 'Loading model…'}
          placeholderTextColor="#AAA"
          multiline
          maxLength={2000}
          editable={llm.isReady && !llm.isGenerating}
        />
        {llm.isGenerating ? (
          <TouchableOpacity
            style={[styles.sendBtn, styles.stopBtn]}
            onPress={() => llm.interrupt()}>
            <Text style={styles.sendBtnText}>■</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!inputText.trim() || !llm.isReady) && styles.sendBtnDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || !llm.isReady}>
            <Text style={styles.sendBtnText}>↑</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
