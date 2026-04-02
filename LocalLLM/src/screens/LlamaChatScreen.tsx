/**
 * LlamaChatScreen — conversational chat using @react-native-ai/llama + Vercel AI SDK.
 *
 * Library stack:
 *   @react-native-ai/llama  → download, store, and manage GGUF models
 *   llama.rn                → native llama.cpp bindings (used internally)
 *   ai (Vercel AI SDK v6)   → streamText / generateText with provider abstraction
 *
 * Key differences vs react-native-executorch ChatScreen:
 *   • Model format: GGUF (.gguf) instead of ExecuTorch (.pte)
 *   • Streaming: async-iterable textStream from Vercel AI SDK
 *   • Provider pattern: llama.languageModel(path) returns an AI SDK LanguageModelV3
 *   • Abort: AbortController.abort() cancels in-flight generation
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { streamText } from 'ai';
import { useLlamaContext } from '../context/LlamaContext';
import LlamaModelLoader from '../components/LlamaModelLoader';
import MessageBubble from '../components/MessageBubble';
import { ChatMessage } from '../types';

const SYSTEM_PROMPT =
  'You are a helpful, concise assistant. Answer clearly and briefly.';

const SUGGESTIONS = [
  'What is a large language model?',
  'Explain async/await in JavaScript',
  'Write a short poem about the ocean',
  'What are the SOLID principles?',
];

const LlamaChatScreen: React.FC = () => {
  const { model, isReady } = useLlamaContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentAssistantIdRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsGenerating(false);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !model || !isReady || isGenerating) {
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
    currentAssistantIdRef.current = assistantId;

    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages([...updatedMessages, assistantMsg]);
    setIsGenerating(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Build conversation for the AI SDK
      const apiMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...updatedMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user' as const, content: text },
      ];

      // streamText returns immediately; textStream is an async iterable
      const result = streamText({
        model,
        messages: apiMessages,
        abortSignal: controller.signal,
      });

      let accumulated = '';
      for await (const chunk of result.textStream) {
        accumulated += chunk;
        const snapshot = accumulated;
        const id = assistantId;
        setMessages(prev =>
          prev.map(m => (m.id === id ? { ...m, content: snapshot } : m)),
        );
        listRef.current?.scrollToEnd({ animated: false });
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') {
        // User stopped generation — keep partial response
      } else {
        const id = assistantId;
        setMessages(prev =>
          prev.map(m =>
            m.id === id
              ? { ...m, content: `[Error: ${e instanceof Error ? e.message : String(e)}]` }
              : m,
          ),
        );
      }
    } finally {
      abortControllerRef.current = null;
      setIsGenerating(false);
    }
  }, [inputText, model, isReady, isGenerating, messages]);

  const clearChat = useCallback(() => setMessages([]), []);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
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
  infoStrip: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FED7AA',
  },
  infoText: {
    fontSize: 11,
    color: '#C2410C',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 14,
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
    borderColor: '#FED7AA',
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
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#FED7AA',
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

export default LlamaChatScreen;
