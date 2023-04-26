import cn from "classnames";
import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import useEngine from "~/hooks/use-engine";
import useWindowSize from "~/hooks/use-window-size";
import { GameState } from "~/types/game-state";
import Spinner from "./spinner";

export default function Test() {
  const dimensions = useWindowSize();
  const { timeLeft, typed, gameState, test, wpm, resetGame } = useEngine();

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        resetGame();
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [resetGame]);

  if (dimensions.width !== undefined) {
    if (dimensions.width < 640) {
      return (
        <div className="flex items-center justify-center">
          <h1 className="text-white">Please use a computer</h1>
        </div>
      );
    }
  }
  if (test.isError)
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-white">Failed to load test</h1>
      </div>
    );
  if (test.isLoading || !test.data) return <Spinner />;
  return (
    <section className="flex w-4/5 flex-col gap-4 md:w-3/5">
      {gameState === GameState.FINISHED ? (
        <div className="flex w-full items-center justify-center">
          <h1 className="text-7xl font-semibold text-white">
            {wpm}
            <span className="text-xl">wpm</span>
          </h1>
          <div
            className="relative left-4 cursor-pointer rounded-md p-2 duration-300 hover:bg-stone-800"
            onClick={resetGame}
          >
            <FaChevronRight size={24} color="white" />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-white">{timeLeft}</h1>
          <div className="relative w-full text-2xl font-semibold">
            <Text testBody={test.data.body} typed={typed} />
          </div>
        </>
      )}
    </section>
  );
}

type TextProps = {
  testBody: string;
  typed: string;
};

const Text = ({ testBody, typed }: TextProps) => {
  return (
    <h1 className="text-zinc-500">
      {testBody.split(" ").map((word, index) => {
        return (
          <Word word={word} key={index} typedWord={typed.split(" ")[index]} />
        );
      })}
    </h1>
  );
};

type WordProps = {
  word: string;
  typedWord: string | undefined;
};
const Word = ({ word, typedWord }: WordProps) => {
  const isIncorrect = word !== typedWord;
  const isFullyTyped =
    typedWord !== undefined && typedWord.length >= word.length;

  const style = cn({
    "border-b-2 border-red-600": isIncorrect && isFullyTyped,
  });
  return (
    <>
      <span className={style}>
        {word.split("").map((char, index) => {
          return (
            <Char
              char={char}
              key={index}
              typedChar={typedWord?.split("")[index]}
            />
          );
        })}
      </span>
      {typedWord && typedWord.length > word.length && (
        <span className="text-red-800">
          {typedWord.slice(word.length, typedWord.length)}
        </span>
      )}{" "}
    </>
  );
};

type CharProps = {
  char: string;
  typedChar: string | undefined;
};

const Char = ({ char, typedChar }: CharProps) => {
  const isCorrect = char === typedChar;
  const isWhiteSpace = char === " ";

  const style = cn({
    "text-red-600 transition-colors duration-150":
      !isCorrect && !isWhiteSpace && typedChar !== undefined,
    "text-white transition-colors duration-150": isCorrect && !isWhiteSpace,
  });

  return <span className={style}>{char}</span>;
};
