import React from "react";
import { calculateWpm } from "../../utils/test-stats";

type Props = {
  wpm: number;
};

export const Result = (props: Props) => {
  return (
    <h2 className="text-4xl font-semibold text-white">
      {props.wpm}
      <span className="text-2xl"> wpm</span>
    </h2>
  );
};
