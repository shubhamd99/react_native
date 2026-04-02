/**
 * @file Custom hook for managing the LlamaChat logic.
 * Integrates with LlamaContext to access the model and uses the Vercel AI SDK
 * for streaming text responses.
 */

// React
import { useRef, useState, useCallback, useEffect } from 'react';

// React Native
import { FlatList } from 'react-native';

// AI Libraries
import { streamText } from 'ai';

// Context
import { useLlamaContext } from '../../context/LlamaContext';

// Types
import { ChatMessage } from '../../types';

// Constants
import { SYSTEM_PROMPT } from './LlamaChat.constants';

/**
 * Custom hook for LlamaChat functionality.
 * 
 * @returns {Object} Chat state, refs, and handlers.
 */
export const useLlamaChat = () => {
  const { model, isReady } = useLlamaContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentAssistantIdRef = useRef<string | null>(null);

  /**
   * Cleanup: Abort generation on unmount.
   */
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /**
   * Manual interruption of the model generation.
   */
  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsGenerating(false);
  }, []);

  /**
   * Sends a user message and starts a streaming response from the Llama model.
   * Utilizes Vercel AI SDK's streamText for token-by-token processing.
   */
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
      /**
       * Construct the conversation history for the Vercel AI SDK.
       */
      const apiMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...updatedMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user' as const, content: text },
      ];

      /**
       * Start the streaming process.
       * The 'model' here is provided by the @react-native-ai/llama library
       * through the LlamaContext.
       */
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
      // Don't show error message if generation was manually aborted
      if (!(e instanceof Error && e.name === 'AbortError')) {
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

  /**
   * Resets the chat history.
   */
  const clearChat = useCallback(() => setMessages([]), []);

  return {
    messages,
    inputText,
    setInputText,
    isGenerating,
    listRef,
    isReady,
    sendMessage,
    stopGeneration,
    clearChat,
  };
};
