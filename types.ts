
export interface AnswerOption {
  text: string;
  isCorrect: boolean;
}

export interface QuestionData {
  id: number;
  text: string;
  options: AnswerOption[];
  explanation: string;
}

export enum GameState {
  LOADING_ASSETS,
  WELCOME,
  PLAYING,
  SHOW_FEEDBACK,
  FINISHED,
}

export interface GeneratedImages {
  [key: string]: string | null; // Store base64 image data or null if failed
}

export interface ImagePrompt {
  key: string;
  prompt: string;
}
