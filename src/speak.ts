export const sayQuote = (quote: string) => {
  const speak = new SpeechSynthesisUtterance(quote);
  speak.lang = "en-US";
  window.speechSynthesis.speak(speak);
};
