import { IWord } from "../Components/types";
import { api } from "./api";
import { getPathSpeech } from "./getPathSpeech";

export const getNewWord = async (value: string): Promise<IWord> => {
  const res = await api.getWordInformation(value);
  if (res.def[0]) {
    const wordInfo = res.def[0];
    const transcription = wordInfo.ts || null;
    const translations = wordInfo.tr.map((el: any) => el.text);
    const examples = wordInfo.tr
      ? wordInfo.tr[0].ex
        ? wordInfo.tr[0].ex.map((el: any) => el.text)
        : null
      : null;
    const pos = getPathSpeech(wordInfo.pos) || null;
    const gen =
      wordInfo.gen === "f" ? "жен" : wordInfo.gen === "m" ? "муж" : null;

    return {
      key: value,
      word: value,
      transcription,
      translations,
      examples,
      pos,
      gen,
    };
  }

  return {
    key: value,
    word: value,
    transcription: null,
    translations: null,
    examples: null,
    pos: null,
    gen: null,
  };
};

export const getWordInformation = async (value: string) => {
  const res = await api.getWordInformation(value);
  return res;
};
