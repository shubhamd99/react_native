export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  ramRequired: string;
  model: unknown;
}

export type UseCaseId = 'chat' | 'summarize' | 'translate' | 'code' | 'cloud';

export interface UseCase {
  id: UseCaseId;
  title: string;
  description: string;
  icon: string;
  color: string;
}
