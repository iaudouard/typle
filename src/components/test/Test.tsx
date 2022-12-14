import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { Result } from "./Wpm";
import { Text } from "./Text";
import { Timer } from "./Timer";

import { FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { transition, variants } from "../../constants/animation-values";
import { calculateWpm } from "../../lib/test-stats";
import { useContext } from "react";
import { TestContext } from "../../context/TestContext";
import { useTimerHook } from "../../hooks/useTimer";
import { trpc } from "../../lib/trpc";

export const Test = () => {
  const { test, setTest } = useContext(TestContext);
  const [userInput, setUserInput] = useState<string>("");

  const resultMutation = trpc.test["post-result"].useMutation();

  const [hasCompletedTest, setHasCompletedTest] = useState<boolean>(false);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const onTestComplete = (testTimerLength: number): void => {
    const wpm = calculateWpm(testTimerLength, userInput, test.testBody);

    resultMutation.mutate({ username: "ivanadrd", wpm: wpm, testId: test.id });

    setHasCompletedTest(true);
    setTest({ ...test, results: [...test.results, wpm] });

    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    restart(time, false);
  };

  const { seconds, start, isRunning, restart } = useTimerHook({
    durationInSeconds: 15,
    onExpire: () => onTestComplete(15),
  });

  useEffect(() => {
    isInputFocused ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isInputFocused]);

  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) {
      start();
    }
    setUserInput(e.currentTarget.value);

    //if user has perfectly completed test  end test
    if (e.currentTarget.value === test.testBody) {
      onTestComplete(15 - seconds);
    }
  };

  const resetTest = () => {
    setHasCompletedTest(false);
    setUserInput("");
  };

  const handleTab = (ev: KeyboardEvent) => {
    if (hasCompletedTest && ev.key === "Tab") {
      ev.preventDefault();
      resetTest();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleTab);

    return () => {
      window.removeEventListener("keydown", handleTab);
    };
  }, [hasCompletedTest]);

  if (hasCompletedTest) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        transition={transition}
        className="flex items-center gap-4"
      >
        <Result />
        <Button onClick={resetTest} tabIndex={0}>
          <FaRedo />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        transition={transition}
        className="flex max-w-2/3 flex-col items-center"
      >
        <h3 className="self-start text-2xl font-semibold text-white">
          {seconds}
        </h3>

        <div
          onClick={() => setIsInputFocused(true)}
          className={`z-50 w-full py-2 transition duration-300 ${
            !isInputFocused && "blur-sm"
          }`}
        >
          <Text userInput={userInput} testString={test.testBody} />
        </div>

        <input
          autoFocus
          ref={inputRef}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="none"
          className="absolute border-none bg-transparent opacity-0 outline-none"
          //handling the input change and updating state
          onChange={handleTestInputChange}
          onBlur={() => setIsInputFocused(false)}
          onFocus={() => setIsInputFocused(true)}
          onPaste={(e) => e.preventDefault()}
        />
      </motion.div>
    </AnimatePresence>
  );
};
