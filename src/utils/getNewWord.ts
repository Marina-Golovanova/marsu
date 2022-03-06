import { api } from "./api";

export const getNewWord = async (value: string) => {
  const res = await api.getWordInformation(value);
  if (res.def[0]) {
    const wordInfo = res.def[0];
    const transcription = wordInfo.ts;
    const translation = wordInfo.tr[0].text;

    return { transcription, translation };
  }

  throw new Error("Word doesn't exist");
};

export const getWordInformation = async (value: string) => {
  const res = await api.getWordInformation(value);
  return res;
};
