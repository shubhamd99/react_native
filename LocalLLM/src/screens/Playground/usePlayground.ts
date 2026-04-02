/**
 * @file Custom hook for managing the playground logic.
 * Handles the state for system prompts, user messages, and on-device inference.
 */

// React
import { useState, useCallback, useEffect, useRef } from 'react';

// React Native
import { ScrollView } from 'react-native';

// LLM Libraries
import { useLLM } from 'react-native-executorch';

// Constants
import { DEFAULT_MODEL } from '../../constants/models';
import { DEFAULT_SYSTEM, DEFAULT_USER, PRESETS } from './Playground.constants';

/**
 * Custom hook for playground functionality.
 * 
 * @returns {Object} Playground state, refs, and handlers.
 */
export const usePlayground = () => {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM);
  const [userMessage, setUserMessage] = useState(DEFAULT_USER);
  const [output, setOutput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  /**
   * Initialize the LLM with the default model.
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
   * Model Lifecycle: Configuration
   * Updates the model's system prompt configuration when the model is ready.
   */
  useEffect(() => {
    if (llm.isReady) {
      llm.configure({ chatConfig: { systemPrompt } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llm.isReady]);

  /**
   * Model Lifecycle: Stream Processing
   * Updates the output state in real-time and scrolls to the end of the view.
   */
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setOutput(llm.response);
      scrollRef.current?.scrollToEnd({ animated: false });
    }
  }, [llm.response, llm.isGenerating]);

  /**
   * Triggers the inference process using the current system and user prompts.
   */
  const handleRun = useCallback(async () => {
    const sys = systemPrompt.trim();
    const usr = userMessage.trim();
    if (!sys || !usr || !llm.isReady || llm.isGenerating) {
      return;
    }
    setOutput('');

    /**
     * Use generate() for stateless inference.
     * Unlike sendMessage(), this doesn't maintain an internal history buffer.
     */
    await llm.generate([
      { role: 'system', content: sys },
      { role: 'user', content: usr },
    ]);

    // Ensure final output reflects the complete response
    if (llm.response) {
      setOutput(llm.response);
    }
  }, [systemPrompt, userMessage, llm]);

  /**
   * Applies a predefined prompt preset to the inputs.
   * 
   * @param {Object} preset - The preset configuration containing system and user prompts.
   */
  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setSystemPrompt(preset.system);
    setUserMessage(preset.user);
    setOutput('');
  };

  /**
   * Utility flag to determine if inference can be started.
   */
  const canRun = llm.isReady && !llm.isGenerating && systemPrompt.trim().length > 0 && userMessage.trim().length > 0;

  return {
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
  };
};
