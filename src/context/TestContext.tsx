import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Loading } from "../components/Loading";
import type { Test } from "../types/Test";
import {
  fetchTestResultsLocally,
  storeTestResultsLocally,
} from "../lib/local-storage";
import { trpc } from "../lib/trpc";

type TestContextType = {
  test: Test;
  setTest: Dispatch<SetStateAction<Test>>;
};

const defaultTest = { id: "", testBody: "", results: [] };

const defaultTestContext = {
  test: defaultTest,
  setTest: () => null,
};

export const TestContext = createContext<TestContextType>(defaultTestContext);

type Props = {
  children: React.ReactNode;
};

const TestContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [test, setTest] = useState<Test>(defaultTest);

  const orderedTests = trpc.test.get.useQuery();

  useEffect(() => {
    if (orderedTests.data) {
      const latestTest = orderedTests.data.tests[0]!;
      const localResults = fetchTestResultsLocally(latestTest.id);
      setTest({
        id: latestTest.id,
        testBody: latestTest.test,
        //if results is undefined (test hasn't been taken yet) make results an empty array (avoid home page results length check error for undefined)
        results: localResults ? localResults : [],
      });
      setIsLoading(false);
    }
  }, [orderedTests.data]);

  useEffect(() => {
    if (test.results.length > 0) {
      storeTestResultsLocally(test);
    }

    // console.log("test result useeffect ran", test);
  }, [test.results]);

  return (
    <TestContext.Provider value={{ test, setTest }}>
      {isLoading ? <Loading /> : children}
    </TestContext.Provider>
  );
};
export default TestContextProvider;
