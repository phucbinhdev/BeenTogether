export enum AppMode {
  GAME = 'GAME',
  IMAGE_EDITOR = 'IMAGE_EDITOR',
  IMAGE_ANALYZER = 'IMAGE_ANALYZER',
  HISTORY = 'HISTORY'
}

export interface CardQuestion {
  id: number | string; // Changed to support UUIDs/Strings for custom questions
  content: string;
  category: 'fun' | 'deep' | 'spicy';
  isCustom?: boolean;
}

export interface ImageAnalysisResult {
  text: string;
}

export interface ImageGenerationResult {
  imageUrl: string | null;
  text: string | null;
}

export enum PlayerTurn {
  PLAYER_1 = 'Người 1',
  PLAYER_2 = 'Người 2'
}

export interface AnswerRecord {
  id: string;
  questionId: number | string;
  questionContent: string;
  player: PlayerTurn;
  answer: string;
  timestamp: number;
}