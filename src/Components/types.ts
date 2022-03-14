export type IColKey = "key" | "word" | "transcription" | "translations";

export type ICols = {
  key: string;
  word: string;
  transcription: string | null;
  translation: string | null;
};

export type IWord = {
  key: string;
  word: string;
  translations: string[] | null;
  transcription: string | null;
  examples: string[] | null;
  pos: string | null;
  gen: string | null;
};
