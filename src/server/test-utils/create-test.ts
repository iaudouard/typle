export function createTest(words: string[]) {
  let test = "";
  for (let i = 0; i < 100; i++) {
    const newWordIndex = Math.floor(Math.random() * words.length + 1);
    const newWord = words[newWordIndex];

    test += `${newWord} `;
  }

  return test.trim();
}
