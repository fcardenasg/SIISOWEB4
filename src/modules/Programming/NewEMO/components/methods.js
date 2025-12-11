export function formatFirstWord(text) {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return "";
    const firstWord = words[0].toLowerCase();
    const formattedFirst = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    return [formattedFirst, ...words.slice(1)].join(" ");
}