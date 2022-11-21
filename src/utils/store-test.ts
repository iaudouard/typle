import { getLS, setLS } from "./local-storage";

export function storeTestLocally(testId: string, wpm: number) {
  if (getLS(testId)) {
    const tempStore = JSON.parse(getLS(testId)!);
    const newResultList = [...tempStore, wpm];
    setLS(testId, newResultList);
  } else {
    setLS(testId, [wpm]);
  }
}
