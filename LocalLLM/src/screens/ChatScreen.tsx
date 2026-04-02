import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';
import { useLLM } from 'react-native-executorch';
import ModelLoader from '../components/ModelLoader';
import MessageBubble from '../components/MessageBubble';
import { ChatMessage } from '../types';
import { SYSTEM_PROMPTS } from '../constants/systemPrompts';
import { DEFAULT_MODEL } from '../constants/models';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const assistantMsgId = useRef<string | null>(null);

  const llm = useLLM({ model: DEFAULT_MODEL });

  // Set system prompt once model is ready
  useEffect(() => {
    if (llm.isReady) {
      llm.configure({
        chatConfig: { systemPrompt: SYSTEM_PROMPTS.chat },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llm.isReady]);

  // Stream the LLM token-by-token into the latest assistant message
  useEffect(() => {
    if (!llm.isGenerating || !assistantMsgId.current || !llm.response) {
      return;
    }
    const id = assistantMsgId.current;
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, content: llm.response } : m)),
    );
  }, [llm.response, llm.isGenerating]);

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    const assistantId = (Date.now() + 1).toString();
    assistantMsgId.current = assistantId;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);

    // sendMessage manages conversation history internally
    await llm.sendMessage(text);

    // Finalize with completed response
    if (llm.response) {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, content: llm.response } : m,
        ),
      );
    }
  }, [inputText, llm]);

  const clearChat = useCallback(() => {
    setMessages([]);
    llm.deleteMessage(0);
  }, [llm]);

  const renderItem: ListRenderItem<ChatMessage> = useCallback(
    ({ item }) => <MessageBubble role={item.role} content={item.content} />,
    [],
  );

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

const SUGGESTIONS = [
  'What is machine learning?',
  'Write a haiku about autumn',
  'Explain recursion simply',
  'What are the benefits of exercise?',
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  clearBtnText: {
    fontSize: 13,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  suggestions: {
    width: '100%',
    gap: 8,
  },
  suggestion: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  suggestionText: {
    fontSize: 14,
    color: '#444',
  },
  messageList: {
    paddingVertical: 12,
    paddingBottom: 20,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1A1A1A',
    maxHeight: 120,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#D0CEF5',
  },
  stopBtn: {
    backgroundColor: '#EF4444',
  },
  sendBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default ChatScreen;
