import React from "react";
import { calculateWpm } from "../../utils/test-stats";

type Props = {
  test: string;
  userInput: string;
};

export const Result = (props: Props) => {
  return (
    <h2 className="text-4xl font-semibold text-white">
      {calculateWpm(15, props.userInput, props.test)}
      <span className="text-2xl"> wpm</span>
    </h2>
  );
};
