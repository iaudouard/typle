import React, { useEffect, useState } from "react";

type Props = {
  testString: string;
  userInput: string;
};

export const Text = (props: Props) => {
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);

  useEffect(() => {
    setCurrWordIndex(props.userInput.split(" ").length - 1);
  }, [props.userInput]);

  return (
    <h3 className="user-none cursor-default text-2xl font-semibold">
      {props.testString?.split(" ").map((testWord, i) => {
        return (
          <span key={i}>
            <Word
              userInput={props.userInput}
              testWord={testWord}
              index={i}
              currWordIndex={currWordIndex}
            />{" "}
          </span>
        );
      })}
    </h3>
  );
};

type WordProps = {
  userInput: string;
  testWord: string;
  index: number;
  currWordIndex: number;
};

const Word = (props: WordProps) => {
  const userInputWordList = props.userInput.split(" ");
  const currUserInputWord = userInputWordList[props.index];

  return (
    <span
      className={
        currUserInputWord && props.currWordIndex > props.index
          ? currUserInputWord!.length < props.testWord.length
            ? "word-incorrect"
            : ""
          : ""
      }
    >
      {props.testWord.split("").map((char, j) => {
        return (
          <Char
            userInput={userInputWordList[props.index]}
            char={char}
            index={j}
            key={j}
          />
        );
      })}

      {currUserInputWord && props.testWord.length < currUserInputWord!.length && (
        <>
          {currUserInputWord
            ?.slice(props.testWord.length)
            .split("")
            .map((char, j) => {
              return <ExtraChar char={char} />;
            })}
        </>
      )}
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

type ExtraCharProps = {
  char: string;
};

const ExtraChar = (props: ExtraCharProps) => {
  return <span className="char-extra duration-200">{props.char}</span>;
};
