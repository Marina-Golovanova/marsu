const apiKeyWord =
  "dict.1.1.20220202T094301Z.83ebca7de244ad75.653bce3af33867dd9c05d243cb6f3df2a3c8231d";

const basicUrlWord = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKeyWord}&lang=es-ru&text=`;

const apiImageKey = "AIzaSyDl-nofM-3oTyrUq-06TxZ3yPzz3-HkI-I";
const cx = "085fbddb694d8ba99";

export const api = {
  getWordInformation: async (word: string) => {
    const res = await fetch(`${basicUrlWord}${word}`);
    return res.json();
  },

  getImage: async (word: string) => {
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiImageKey}&cx=${cx}&q=${word}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json`
    );
    return res.json();
  },
};
