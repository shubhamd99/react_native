/**
 * @file Constants for the Translate screen.
 * Defines the supported languages and their associated metadata.
 */

/**
 * Interface representing a supported language for translation.
 */
export interface Language {
  /** The language name or code used in the prompt */
  code: string;
  /** Display label for the language UI */
  label: string;
  /** Emoji flag representing the language/region */
  flag: string;
}

/**
 * List of supported target languages.
 * Used to populate the language picker on the Translate screen.
 */
export const LANGUAGES: Language[] = [
  { code: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
  { code: 'French', label: 'French', flag: '🇫🇷' },
  { code: 'German', label: 'German', flag: '🇩🇪' },
  { code: 'Japanese', label: 'Japanese', flag: '🇯🇵' },
  { code: 'Chinese (Simplified)', label: 'Chinese', flag: '🇨🇳' },
  { code: 'Hindi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'Arabic', label: 'Arabic', flag: '🇸🇦' },
  { code: 'Portuguese', label: 'Portuguese', flag: '🇧🇷' },
];
