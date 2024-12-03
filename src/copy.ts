export const copy = async (quote: string) => {
  try {
    await navigator.clipboard.writeText(quote);
    alert("Text copied to clipboard!");
  } catch (err) {
    alert("Failed to copy text: " + err);
  }
};
