import React, { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import type { Test } from "../types/Test";
import { fetchTestResultsLocally } from "../utils/local-storage-test";
import { trpc } from "../utils/trpc";

const defaultTestContext = {
  id: "",
  test: "",
  results: [],
};

export const TestContext = createContext<Test>(defaultTestContext);

type Props = {
  children: React.ReactNode;
};

const TestContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [testContext, setTestContext] = useState<Test>(defaultTestContext);

  const orderedTests = trpc.test.get.useQuery();

  useEffect(() => {
    if (orderedTests.data) {
      const latestTest = orderedTests.data.tests[0]!;
      const localResults = fetchTestResultsLocally(latestTest.id);
      setTestContext({
        id: latestTest.id,
        test: latestTest.test,
        results: localResults,
      });
      setIsLoading(false);
    }
  }, [orderedTests.data]);
  return (
    <TestContext.Provider value={testContext!}>
      {isLoading ? <Loading /> : children}
    </TestContext.Provider>
  );
};
export default TestContextProvider;
