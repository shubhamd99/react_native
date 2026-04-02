/**
 * @file Custom hook for managing the chat logic.
 * Handles model initialization, message history, streaming responses, and lifecycle management.
 */

// React
import { useRef, useState, useCallback, useEffect } from 'react';

// React Native
import { FlatList } from 'react-native';

// LLM Libraries
import { useLLM } from 'react-native-executorch';

// Constants
import { SYSTEM_PROMPTS } from '../../constants/systemPrompts';
import { DEFAULT_MODEL } from '../../constants/models';

// Types
import { ChatMessage } from '../../types';

/**
 * Custom hook for chat functionality.
 * 
 * @returns {Object} Chat state and handlers.
 */
export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const assistantMsgId = useRef<string | null>(null);

  /**
   * Initialize the LLM with the default model.
   * ExecuTorch automatically handles model download, caching, and runtime initialization.
   */
  const llm = useLLM({ model: DEFAULT_MODEL });

  /**
   * Model Lifecycle: Cleanup
   * Ensures that any ongoing generation is interrupted when the component unmounts.
   */
  useEffect(() => {
    return () => {
      if (llm.isGenerating) {
        llm.interrupt();
      }
    };
  }, [llm.isGenerating, llm]);

  /**
   * Model Lifecycle: Initialization
   * Configures the system prompt once the model is fully loaded and ready for inference.
   */
  useEffect(() => {
    if (llm.isReady) {
      llm.configure({
        chatConfig: { systemPrompt: SYSTEM_PROMPTS.chat },
      });
    }
  }, [llm.isReady, llm]);

  /**
   * Model Lifecycle: Stream Processing
   * Monitors the streaming response from the LLM and updates the latest assistant message.
   * This provides a "typewriter" effect as tokens are generated.
   */
  useEffect(() => {
    if (!llm.isGenerating || !assistantMsgId.current || !llm.response) {
      return;
    }
    const id = assistantMsgId.current;
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, content: llm.response } : m)),
    );
  }, [llm.response, llm.isGenerating]);

  /**
   * Sends a user message to the LLM.
   * Updates the UI with the user message and an empty assistant message,
   * then triggers the LLM inference.
   */
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

    // Perform inference on the user message
    await llm.sendMessage(text);

    // Final update for the assistant message content
    if (llm.response) {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, content: llm.response } : m,
        ),
      );
    }
  }, [inputText, llm]);

  /**
   * Clears the chat history and resets the internal LLM state.
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    llm.deleteMessage(0);
  }, [llm]);

  return {
    messages,
    inputText,
    setInputText,
    listRef,
    llm,
    sendMessage,
    clearChat,
  };
};
