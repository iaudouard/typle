import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
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
  isTestShown: boolean;
};

const defaultTest = { id: "", testBody: "", results: [] };

const defaultTestContext = {
  test: defaultTest,
  setTest: () => null,
  isTestShown: true,
};

export const TestContext = createContext<TestContextType>(defaultTestContext);

type Props = {
  children: React.ReactNode;
};

const TestContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [test, setTest] = useState<Test>(defaultTest);
  const [isTestShown, setIsTestShown] = useState<boolean>(true);

  const testReq = trpc.test.get.useQuery();

  useEffect(() => {
    if (testReq.data) {
      const tempTest = testReq.data.test!;
      const localResults = fetchTestResultsLocally(tempTest.id);
      setTest({
        id: tempTest.id,
        testBody: tempTest.test,
        //if results is undefined (test hasn't been taken yet) make results an empty array (avoid home page results length check error for undefined)
        results: localResults ? localResults : [],
      });
      setIsLoading(false);
    }
  }, [testReq.data]);

  useEffect(() => {
    if (test.results.length > 0) {
      storeTestResultsLocally(test);
    }
    if (test.results.length >= 6) {
      setIsTestShown(false);
    }

    // console.log("test result useeffect ran", test);
  }, [test.results]);

  return (
    <TestContext.Provider value={{ test, setTest, isTestShown }}>
      {isLoading ? <Loading /> : children}
    </TestContext.Provider>
  );
};
export default TestContextProvider;
