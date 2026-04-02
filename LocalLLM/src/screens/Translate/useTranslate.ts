/**
 * @file Custom hook for managing the translation logic.
 * Handles language selection, model initialization, and triggering inference for translation.
 */

// React
import { useState, useCallback, useEffect } from 'react';

// LLM Libraries
import { useLLM } from 'react-native-executorch';

// Constants
import { SYSTEM_PROMPTS } from '../../constants/systemPrompts';
import { DEFAULT_MODEL } from '../../constants/models';
import { LANGUAGES, Language } from './Translate.constants';

/**
 * Custom hook for translation functionality.
 * 
 * @returns {Object} Translate state and handlers.
 */
export const useTranslate = () => {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES[0]);
  const [translation, setTranslation] = useState('');

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
   * Updates the translation state in real-time as the model generates tokens.
   */
  useEffect(() => {
    if (llm.isGenerating && llm.response) {
      setTranslation(llm.response);
    }
  }, [llm.response, llm.isGenerating]);

  /**
   * Triggers the translation process.
   * Constructs a specific prompt using a system instruction and the target language name.
   */
  const handleTranslate = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !llm.isReady || llm.isGenerating) {
      return;
    }
    setTranslation('');

    /**
     * Use the generate function for one-off tasks like translation.
     * The prompt explicitly instructs the model to only output the translation.
     */
    await llm.generate([
      { role: 'system', content: SYSTEM_PROMPTS.translate },
      {
        role: 'user',
        content: `Translate the following text into ${targetLang.code}. Output only the translation:\n\n${text}`,
      },
    ]);

    // Ensure the final state reflects the complete response
    if (llm.response) {
      setTranslation(llm.response);
    }
  }, [inputText, targetLang, llm]);

  return {
    inputText,
    setInputText,
    targetLang,
    setTargetLang,
    translation,
    setTranslation,
    llm,
    handleTranslate,
  };
};
