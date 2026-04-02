/**
 * @file Constants for the Home screen.
 * Defines the configuration for library sections and feature cards displayed on the dashboard.
 */

// Types
import { RootStackParamList } from '../../../App';

/**
 * Interface representing a single feature card on the Home screen.
 */
export interface UseCaseCard {
  /** The primary title of the card */
  title: string;
  /** A short description of the feature */
  subtitle: string;
  /** An emoji or icon representing the feature */
  icon: string;
  /** The navigation route to navigate to when the card is pressed */
  route: keyof RootStackParamList;
}

/**
 * Interface representing a library section (e.g., ExecuTorch or llama.rn).
 */
export interface LibrarySection {
  /** Unique key for the section */
  key: string;
  /** Theme color for the section */
  color: string;
  /** Background color for the section header */
  headerBg: string;
  /** Badge text displayed in the header */
  badge: string;
  /** Display name of the library */
  name: string;
  /** Brief tagline for the library */
  tagline: string;
  /** Description of the model format used by the library */
  modelFormat: string;
  /** URL to the library's GitHub repository */
  github: string;
  /** List of feature cards belonging to this library section */
  cards: UseCaseCard[];
}

/**
 * Configuration for the dashboard sections.
 * This constant defines all the content shown on the Home screen.
 */
export const SECTIONS: LibrarySection[] = [
  {
    key: 'executorch',
    color: '#6C63FF',
    headerBg: '#EEF2FF',
    badge: '⚡ On-Device · .pte',
    name: 'react-native-executorch',
    tagline: 'Meta ExecuTorch runtime · Software Mansion',
    modelFormat: 'ExecuTorch (.pte) models from Hugging Face',
    github: 'https://github.com/software-mansion/react-native-executorch',
    cards: [
      {
        title: 'Chat',
        subtitle: 'Conversational AI with useLLM + sendMessage',
        icon: '💬',
        route: 'Chat',
      },
      {
        title: 'Summarize',
        subtitle: 'Bullet-point summary with generate(messages[])',
        icon: '📝',
        route: 'Summarize',
      },
      {
        title: 'Translate',
        subtitle: 'Translate text across 8 languages',
        icon: '🌍',
        route: 'Translate',
      },
      {
        title: 'Code Explainer',
        subtitle: 'Explain any code snippet offline',
        icon: '👨‍💻',
        route: 'Code',
      },
      {
        title: 'Playground',
        subtitle: 'Write any system prompt + message, run on-device',
        icon: '🧪',
        route: 'Playground',
      },
    ],
  },
  {
    key: 'llama',
    color: '#F97316',
    headerBg: '#FFF7ED',
    badge: '🦙 On-Device · .gguf',
    name: '@react-native-ai/llama',
    tagline: 'llama.cpp via llama.rn · Callstack',
    modelFormat: 'GGUF models from Hugging Face',
    github: 'https://github.com/callstackincubator/ai',
    cards: [
      {
        title: 'Chat (streamText)',
        subtitle: 'Streaming chat with Vercel AI SDK streamText',
        icon: '🦙',
        route: 'LlamaChat',
      },
      {
        title: 'Generate (generateText)',
        subtitle: 'Summarize · Q&A · Translate with generateText',
        icon: '⚙️',
        route: 'LlamaGenerate',
      },
    ],
  },
];
