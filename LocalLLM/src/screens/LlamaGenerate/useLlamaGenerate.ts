/**
 * @file Custom hook for managing the LlamaGenerate logic.
 * Handles task selection, model interactions using Vercel AI SDK's generateText,
 * and result tracking (output and token usage).
 */

// React
import { useState, useCallback, useEffect, useRef } from 'react';

// AI Libraries
import { generateText } from 'ai';

// Context
import { useLlamaContext } from '../../context/LlamaContext';

// Constants
import { TASKS, TaskId } from './LlamaGenerate.constants';

/**
 * Custom hook for Llama task generation functionality.
 * 
 * @returns {Object} State and handlers for various LLM tasks.
 */
export const useLlamaGenerate = () => {
  const { model, isReady } = useLlamaContext();
  const [activeTask, setActiveTask] = useState<TaskId>('summarize');
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokenCount, setTokenCount] = useState<{
    input: number;
    output: number;
  } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /**
   * Cleanup: Abort any pending generation on unmount.
   */
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  /**
   * Currently active task configuration based on state.
   */
  const task = TASKS.find(t => t.id === activeTask)!;

  /**
   * Triggers the generation process for the active task.
   * Unlike streamText, this waits for the final result from the model.
   */
  const handleGenerate = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !model || !isReady || isGenerating) {
      return;
    }

    setOutput('');
    setTokenCount(null);
    setIsGenerating(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      /**
       * Call generateText from Vercel AI SDK.
       * This returns a single response after the model finishes generating.
       */
      const result = await generateText({
        model,
        messages: [
          { role: 'system', content: task.systemPrompt },
          {
            role: 'user',
            content: task.buildPrompt(
              text,
              activeTask === 'translate' ? targetLang : undefined,
            ),
          },
        ],
        abortSignal: controller.signal,
      });

      setOutput(result.text);
      setTokenCount({
        input: result.usage.inputTokens ?? 0,
        output: result.usage.outputTokens ?? 0,
      });
    } catch (e: unknown) {
      if (!(e instanceof Error && e.name === 'AbortError')) {
        setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
      }
    } finally {
      abortRef.current = null;
      setIsGenerating(false);
    }
  }, [inputText, model, isReady, isGenerating, task, activeTask, targetLang]);

  /**
   * Switches the active task and resets associated state.
   * 
   * @param {TaskId} id - The ID of the task to switch to.
   */
  const switchTask = (id: TaskId) => {
    setActiveTask(id);
    setInputText('');
    setOutput('');
    setTokenCount(null);
  };

  return {
    activeTask,
    inputText,
    setInputText,
    targetLang,
    setTargetLang,
    output,
    isGenerating,
    tokenCount,
    abortRef,
    isReady,
    task,
    handleGenerate,
    switchTask,
  };
};
