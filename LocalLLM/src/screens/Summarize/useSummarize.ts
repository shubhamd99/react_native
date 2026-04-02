/**
 * @file Custom hook for managing the summarization logic.
 * Handles model initialization, streaming the summary output, and triggering inference.
 */

// React
import { useState, useCallback, useEffect } from 'react';

// LLM Libraries
import { useLLM } from 'react-native-executorch';

// Constants
import { SYSTEM_PROMPTS } from '../../constants/systemPrompts';
import { DEFAULT_MODEL } from '../../constants/models';

/**
 * Custom hook for summarization functionality.
 * 
 * @returns {Object} Summarize state and handlers.
 */
export const useSummarize = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

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
   * Model Lifecycle: Stream Processing
   * Updates the summary state in real-time as the model generates tokens.
   */
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setSummary(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  /**
   * Triggers the summarization process.
   * Constructs a specific prompt using a system instruction and the user's input text.
   */
  const handleSummarize = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setSummary('');

    /**
     * Use the generate function for one-off tasks like summarization.
     * Unlike sendMessage, this allows passing a full array of messages.
     */
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.summarize },
      { role: 'user', content: `Summarize the following text:\n\n${text}` },
    ]);

    // Ensure the final state reflects the complete response
    if (llm.response) {
      setSummary(llm.response);
    }
  }, [inputText, llm]);

  return {
    inputText,
    setInputText,
    summary,
    llm,
    handleSummarize,
  };
};
