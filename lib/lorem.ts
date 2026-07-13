const WORD_BANK = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickWord(): string {
  return WORD_BANK[randomInt(0, WORD_BANK.length - 1)];
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateSentence(): string {
  const wordCount = randomInt(6, 14);
  const words = Array.from({ length: wordCount }, pickWord);
  return `${capitalize(words.join(" "))}.`;
}

function generateParagraph(): string {
  const sentenceCount = randomInt(4, 7);
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

export type LoremMode = "word" | "paragraph" | "list";

export function generateLorem(mode: LoremMode, count: number): string[] {
  if (count <= 0) return [];

  switch (mode) {
    case "word":
      return [
        `${capitalize(Array.from({ length: count }, pickWord).join(" "))}.`,
      ];
    case "paragraph":
      return Array.from({ length: count }, generateParagraph);
    case "list":
      return Array.from({ length: count }, generateSentence);
  }
}
