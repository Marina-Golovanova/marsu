const translationPath: Record<string, string> = {
  adjective: "прилагательное",
  adverb: "наречие",
  conjunction: "союз",
  interjection: "междометие",
  noun: "существительное",
  preposition: "прелог",
  pronoun: "местоимение",
  verb: "глагол",
};

export const getPathSpeach = (value: string) => {
  return translationPath[value];
};
