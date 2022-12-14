import { PAST_TEST_STATS_KEY } from "./../constants/local-storage-keys";
import { Test } from "../types/Test";

export function setLS(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function getLS(key: string) {
  if (
    window.localStorage.getItem(key) &&
    window.localStorage.getItem(key) !== null
  ) {
    return JSON.parse(localStorage.getItem(key)!);
  }
  return undefined;
}

export function storeTestResultsLocally(test: Test) {
  const pastResults: Test[] = getLS(PAST_TEST_STATS_KEY);

  if (pastResults) {
    const latestTestResult = pastResults[pastResults.length - 1];
    if (latestTestResult) {
      if (test.id === latestTestResult.id) {
        setLS(PAST_TEST_STATS_KEY, [
          ...pastResults.slice(0, pastResults.length - 1),
          test,
        ]);
      } else {
        setLS(PAST_TEST_STATS_KEY, [...pastResults, test]);
      }
    }
  } else {
    setLS(PAST_TEST_STATS_KEY, [test]);
  }
}

export function fetchTestResultsLocally(testId: string) {
  const pastResults: Test[] = getLS(PAST_TEST_STATS_KEY);
  if (pastResults) {
    for (let i = 0; i < pastResults.length; i++) {
      if (pastResults[i]!.id === testId) {
        return pastResults[i]!.results;
      }
    }
  }

  return undefined;
}
