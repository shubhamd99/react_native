/**
 * @file Custom hook for managing the code explanation logic.
 * Handles model initialization, code state management, and inference triggering.
 */

// React
import { useState, useCallback, useEffect } from 'react';

// LLM Libraries
import { useLLM } from 'react-native-executorch';

// Constants
import { SYSTEM_PROMPTS } from '../../constants/systemPrompts';
import { DEFAULT_MODEL } from '../../constants/models';

/**
 * Custom hook for code explanation functionality.
 * 
 * @returns {Object} Code explainer state and handlers.
 */
export const useCodeExplainer = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');

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
   * Updates the explanation state in real-time as the model generates tokens.
   */
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setExplanation(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  /**
   * Triggers the code explanation process.
   * Formats the user's code into a Markdown code block for the model.
   */
  const handleExplain = useCallback(async () => {
    const text = code.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setExplanation('');

    /**
     * Use the generate function for one-off tasks like explanation.
     * The prompt provides context that this is a code snippet.
     */
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.code },
      {
        role: 'user',
        content: `Explain the following code:\n\n\`\`\`\n${text}\n\`\`\``,
      },
    ]);

    // Final update for the explanation content
    if (llm.response) {
      setExplanation(llm.response);
    }
  }, [code, llm]);

  return {
    code,
    setCode,
    explanation,
    setExplanation,
    llm,
    handleExplain,
  };
};
