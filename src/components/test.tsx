import cn from "classnames";
import useEngine from "~/hooks/use-engine";
import Spinner from "./spinner";

export default function Test() {
  const { timeLeft, typed, gameState, test, wpm } = useEngine();

  if (test.isLoading || !test.data) return <Spinner />;
  if (test.isError) return <div>Something went wrong</div>;
  return (
    <section className="flex w-3/5 flex-col gap-4">
      {gameState === "finished" ? (
        <div className="flex w-full items-center justify-center">
          <h1 className="text-5xl font-semibold text-white">
            {wpm}
            <span className="text-2xl">wpm</span>
          </h1>
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
