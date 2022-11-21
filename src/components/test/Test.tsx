import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { Result } from "./Result";
import { Text } from "./Text";
import { Timer } from "./Timer";

import { FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { transition, variants } from "../../constants/animation-values";
import { storeTestLocally } from "../../utils/store-test";
import { calculateWpm } from "../../utils/test-stats";

type Props = {
  test: string;
  testId: string;
};

export const Test = (props: Props) => {
  const [userInput, setUserInput] = useState<string>("");

  const [hasStartedTest, setHasStartedTest] = useState<boolean>(false);
  const [hasCompletedTest, setHasCompletedTest] = useState<boolean>(false);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const [wpm, setWpm] = useState<number>();

  useEffect(() => {
    isInputFocused ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isInputFocused]);

  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStartedTest) setHasStartedTest(true);
    setUserInput(e.target.value);
  };

  //timer logic
  const time = new Date();
  time.setSeconds(time.getSeconds() + 15); // 15 seconds timer

  const onTimerExpire = () => {
    const tempWpm = calculateWpm(15, userInput, props.test);
    setWpm(tempWpm);
    setHasCompletedTest(true);
    storeTestLocally(props.testId, tempWpm);
  };

  const resetTest = () => {
    setHasStartedTest(false);
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
        <Result wpm={wpm!} />
        <Button onClick={resetTest} children={<FaRedo />} tabIndex={0} />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {!hasCompletedTest && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          transition={transition}
          className="flex max-w-2/3 flex-col items-center"
        >
          <Timer
            expiryTimestamp={time}
            durationInSeconds={15}
            onExpire={onTimerExpire}
            isTimerStarted={hasStartedTest}
          />

          <div
            onClick={() => setIsInputFocused(true)}
            className={`z-50 w-full p-2 transition duration-300 ${
              !isInputFocused && "blur-sm"
            }`}
          >
            <Text userInput={userInput} testString={props.test} />
          </div>

          <input
            autoFocus
            ref={inputRef}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="none"
            className="absolute border-none bg-transparent opacity-0 outline-none"
            onChange={(e) => handleTestInputChange(e)}
            onBlur={() => setIsInputFocused(false)}
            onFocus={() => setIsInputFocused(true)}
            onPaste={(e) => e.preventDefault()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
