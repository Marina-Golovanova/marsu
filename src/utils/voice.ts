export const voice = (text: string) => {
  const reactivate = window.speechSynthesis;
  const word = new SpeechSynthesisUtterance();
  word.lang = "es-ES";
  word.text = text;
  reactivate.speak(word);
};
