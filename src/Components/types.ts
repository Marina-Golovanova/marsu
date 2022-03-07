export type IColKey = "key" | "word" | "transcription" | "translationes";

export type ICols = {
  key: string;
  word: string;
  transcription: string | null;
  translation: string | null;
};

export type IWord = {
  key: string;
  word: string;
  translationes: string[] | null;
  transcription: string | null;
  examples: string[] | null;
  pos: string | null;
  gen: string | null;
};
