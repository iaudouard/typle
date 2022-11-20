import React from "react";

type Props = {
  testString: string;
  userInput: string;
};

export const Text = (props: Props) => {
  return (
    <h3 className="user-none cursor-default text-2xl font-semibold">
      {props.testString?.split(" ").map((testWord, i) => {
        return (
          <Word
            userInput={props.userInput}
            testWord={testWord}
            index={i}
            key={i}
          />
        );
      })}
    </h3>
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
