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
          {props.testString?.split("").map((char, i) => {
            return <Char userInput={userInput} char={char} index={i} key={i} />;
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

// type WordProps = {
//   userInput: string;
//   word: string;
//   index: number;
// };

// const Word = (props: WordProps) => {
//   return (
//     <span>
//       {props.word.split("").map((char, j) => {
//         return (
//           <Char userInput={props.userInput.split(" ")} char={char} index={j} key={j} />
//         );
//       })}{" "}
//     </span>
//   );
// };

type CharProps = {
  userInput: string;
  char: string;
  index: number;
};

const Char = (props: CharProps) => {
  const charColor = props.userInput.charAt(props.index)
    ? props.userInput.charAt(props.index) === props.char
      ? "white"
      : "blue-500"
    : "gray-500";
  return (
    <span
      key={props.index}
      className={`transition-color duration-200 text-${charColor}`}
    >
      {props.char}
    </span>
  );
};
