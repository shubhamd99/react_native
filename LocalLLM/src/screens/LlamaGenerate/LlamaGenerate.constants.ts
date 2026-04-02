/**
 * @file Constants for the LlamaGenerate screen.
 * Defines the available tasks, language options, and sample inputs.
 */

/**
 * Valid IDs for the tasks supported by the screen.
 */
export type TaskId = 'summarize' | 'qa' | 'translate';

/**
 * Interface representing a task configuration.
 */
export interface Task {
  /** Unique ID for the task */
  id: TaskId;
  /** Display label for the task tab */
  label: string;
  /** Icon/Emoji representing the task */
  icon: string;
  /** The system instruction provided to the LLM */
  systemPrompt: string;
  /** Function to build the final user prompt from input and options */
  buildPrompt: (input: string, lang?: string) => string;
  /** Placeholder text for the input area */
  placeholder: string;
}

/**
 * Configuration for the available LLM tasks.
 */
export const TASKS: Task[] = [
  {
    id: 'summarize',
    label: 'Summarize',
    icon: '📝',
    systemPrompt:
      'You are a summarization expert. Summarize in 3–5 bullet points. Start with bullets immediately.',
    buildPrompt: text => `Summarize:\n\n${text}`,
    placeholder: 'Paste any article, email, or document…',
  },
  {
    id: 'qa',
    label: 'Q&A',
    icon: '🤔',
    systemPrompt:
      'You are a knowledgeable assistant. Answer concisely in 2–3 sentences.',
    buildPrompt: text => text,
    placeholder: 'Ask any question…',
  },
  {
    id: 'translate',
    label: 'Translate',
    icon: '🌍',
    systemPrompt:
      'You are a professional translator. Output only the translated text.',
    buildPrompt: (text, lang) =>
      `Translate to ${lang ?? 'Spanish'}:\n\n${text}`,
    placeholder: 'Enter text to translate…',
  },
];

/**
 * List of target languages for the translation task.
 */
export const TRANSLATE_LANGS = ['Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Arabic'];

/**
 * Predefined sample inputs for each task to allow quick testing.
 */
export const SAMPLE_INPUTS: Record<TaskId, string> = {
  summarize:
    'React Native is a framework for building native mobile apps using React and JavaScript. It compiles to native code, giving apps a look and feel consistent with platform conventions. It shares most code between iOS and Android while allowing platform-specific customizations. Hot reloading speeds up development cycles. React Native is used by companies like Facebook, Airbnb, and Shopify.',
  qa: 'What is the difference between concurrency and parallelism?',
  translate: 'The quick brown fox jumps over the lazy dog.',
};
