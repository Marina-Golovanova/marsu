import { api } from "./api";

export const getNewWord_ = (value: string) => {
  return new Promise<{ transcription: string; translation: string }>(
    (resolve, rej) => {
      api.getWordInformation(value).then((res) => {
        if (res.def[0]) {
          const wordInfo = res.def[0];
          const transcription = wordInfo.ts;
          const translation = wordInfo.tr[0].text;
          resolve({ transcription, translation });
        } else {
          rej(new Error("Word doesn't exist"));
        }
      });
    }
  );
};

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
