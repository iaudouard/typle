import { useEffect, useRef, useState } from "react";

type Props = {
  testString?: string;
};

export const Test = (props: Props) => {
  const [userInput, setUserInput] = useState<string>("");

  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isInputFocused ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isInputFocused]);

  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <div
        onClick={() => setIsInputFocused(true)}
        className={`z-50 flex max-w-2/3 items-center p-2 transition duration-300 ${
          isInputFocused ? "" : "blur-sm"
        }`}
      >
        <h3 className="user-none cursor-default text-2xl font-semibold">
          {props.testString?.split(" ").map((testWord, i) => {
            return (
              <Word
                userInput={userInput}
                testWord={testWord}
                index={i}
                key={i}
              />
            );
          })}
        </h3>
      </div>

      <input
        ref={inputRef}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="none"
        className="absolute opacity-0"
        onChange={(e) => handleTestInputChange(e)}
        onBlur={() => setIsInputFocused(false)}
        onFocus={() => setIsInputFocused(true)}
        onPaste={(e) => e.preventDefault()}
      />
    </>
  );
};

type WordProps = {
  userInput: string;
  testWord: string;
  index: number;
};

const Word = (props: WordProps) => {
  const userInputWordList = props.userInput.split(" ");
  return (
    <span>
      {props.testWord.split("").map((char, j) => {
        return (
          <Char
            userInput={userInputWordList[props.index]}
            char={char}
            index={j}
            key={j}
          />
        );
      })}{" "}
    </span>
  );
};

type CharProps = {
  userInput: string | undefined;
  char: string;
  index: number;
};

const Char = (props: CharProps) => {
  const charClass = props.userInput
    ? props.userInput.charAt(props.index)
      ? props.userInput.charAt(props.index) === props.char
        ? "char-correct"
        : "char-incorrect"
      : "char-inactive"
    : "char-inactive";

  return (
    <span
      key={props.index}
      className={`transition-color duration-200 ${charClass}`}
    >
      {props.char}
    </span>
  );
};
