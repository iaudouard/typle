import { useEffect, useRef, useState } from "react";
import { Result } from "./Result";
import { Text } from "./Text";
import { Timer } from "./Timer";

type Props = {
  test: string;
};

export const Test = (props: Props) => {
  const [userInput, setUserInput] = useState<string>("");

  const [hasStartedTest, setHasStartedTest] = useState<boolean>(false);
  const [hasCompletedTest, setHasCompletedTest] = useState<boolean>(false);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setHasCompletedTest(true);
  };

  return (
    <>
      {hasCompletedTest ? (
        <Result test={props.test} userInput={userInput} />
      ) : (
        <div className="flex max-w-2/3 flex-col items-center">
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
        </div>
      )}
    </>
  );
};
