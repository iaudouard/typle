import { Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import fetchTest from "./helpers/fetch-test";
import Test from "./components/Test";

import { setLS, getLS } from "./helpers/local-storage";

import { defaultConfig } from "./constants/deftault-config";
import { Test as TestType } from "./types/test";
import { isNewDay } from "./helpers/compare-date";
import { getDate } from "./helpers/get-date";

function App() {
  const [textToType, setTextToType] = useState<string>("Hello World!");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchTest(3)
      .then((res: string) => {
        setTextToType(res);
      })
      .then(() => {
        const config = getLS("config");
        const pastTests: Array<TestType> = getLS("pastTests")
          ? JSON.parse(getLS("pastTests")!)
          : undefined;

        if (!config) {
          setLS("config", defaultConfig);
        }

        if (!pastTests) {
          setLS("pastTests", []);
        } else {
          if (pastTests[pastTests.length - 1]) {
            var lastDate = pastTests[pastTests.length - 1].date;
            const date = getDate();

            if (isNewDay(lastDate, date)) {
              setHasCompleted(false);
            } else {
              setHasCompleted(true);
            }
          }
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <VStack minH="100vh" justifyContent="center" bg="tomato" zIndex="0">
      <Text
        color="white"
        pos="absolute"
        top={4}
        fontWeight="bold"
        fontSize="4xl"
      >
        typle.
      </Text>
      <Test
        textToType={textToType}
        hasCompleted={hasCompleted}
        setHasCompleted={setHasCompleted}
      />
    </VStack>
  );
}

export default App;
