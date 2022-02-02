const apiKey =
  "dict.1.1.20220202T094301Z.83ebca7de244ad75.653bce3af33867dd9c05d243cb6f3df2a3c8231d";

const basicUrl = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=es-ru&text=`;

export const api = {
  getWordInformation: async (word: string) => {
    const res = await fetch(`${basicUrl}${word}`);
    return res.json();
  },
};
