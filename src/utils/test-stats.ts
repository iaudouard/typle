function calculateNumberOfCorrectWordChars(
  testUserInput: string,
  test: string
) {
  let numberOfCorrectChars = 0;
  const userInputWords = testUserInput.split(" ");
  const testWords = test.split(" ");
  for (let word in userInputWords) {
    //only add correct chars if whole word is correct
    if (userInputWords[word] === testWords[word]) {
      numberOfCorrectChars += userInputWords[word]!.length;
    }
  }

  //spaces
  numberOfCorrectChars += userInputWords.length - 1;

  return numberOfCorrectChars;
}

export function getWpm(
  startTime: number,
  endTime: number,
  testUserInput: string,
  test: string
) {
  const time = startTime - endTime;
  const wpm =
    calculateNumberOfCorrectWordChars(testUserInput, test) / 5 / (time / 60000);

  return wpm;
}
