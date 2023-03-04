import Caret from "./caret";

type Props = {
  typed: string;
  expected: string;
};

export default function UserTyped({ typed, expected }: Props) {
  const typedChars = typed.split("");
  return (
    <div className="absolute inset-0 w-full">
      {typedChars.map((char, index) => {
        return (
          <span className="opacity-0" key={index}>
            {expected[index]}
          </span>
        );
      })}
      <Caret />
    </div>
  );
}
