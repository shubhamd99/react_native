/**
 * @file Constants for the Playground screen.
 * Defines default prompts and experimental presets for user testing.
 */

/**
 * Default system prompt used when the screen is first loaded.
 */
export const DEFAULT_SYSTEM = 'You are a helpful assistant. Answer concisely.';

/**
 * Default user message used when the screen is first loaded.
 */
export const DEFAULT_USER = 'Explain what a transformer model is in 3 sentences.';

/**
 * Predefined prompt configurations (Presets) for different roles.
 * Allows users to quickly test specific LLM personas.
 */
export const PRESETS: { label: string; system: string; user: string }[] = [
  {
    label: '🧑‍🏫 Tutor',
    system: 'You are a patient teacher. Explain concepts simply, as if to a 12-year-old.',
    user: 'How does the internet work?',
  },
  {
    label: '🎭 Storyteller',
    system: 'You are a creative fiction writer. Write vivid, engaging short stories.',
    user: 'Write a 3-sentence story about a robot who discovers music.',
  },
  {
    label: '🩺 Advisor',
    system: 'You are a concise productivity advisor. Give 3 actionable bullet points.',
    user: 'How do I stay focused while working from home?',
  },
  {
    label: '🔬 Analyst',
    system: 'You are a data analyst. Identify patterns and give structured insights.',
    user: 'What are the pros and cons of React Native vs Flutter?',
  },
];
