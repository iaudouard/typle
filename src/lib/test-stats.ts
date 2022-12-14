function calculateNumberOfCorrectWordChars(
  testUserInput: string,
  test: string
) {
  let numberOfCorrectChars = 0;
  const userInputWords = testUserInput.split(" ");
  const testWords = test.split(" ");
  for (const word in userInputWords) {
    //only add correct chars if whole word is correct
    if (userInputWords[word] === testWords[word]) {
      numberOfCorrectChars += userInputWords[word]!.length;
    }
  }

  //spaces
  numberOfCorrectChars += userInputWords.length - 1;

  return numberOfCorrectChars;
}

export function calculateWpm(
  testDuration: number,
  testUserInput: string,
  test: string
) {
  const wpm =
    calculateNumberOfCorrectWordChars(testUserInput, test) /
    5 /
    (testDuration / 60);

  return wpm;
}
