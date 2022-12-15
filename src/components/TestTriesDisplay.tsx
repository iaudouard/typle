import React, { useContext } from "react";
import { TestContext } from "../context/TestContext";

export const TestTriesDisplay = () => {
  const { test } = useContext(TestContext);
  return (
    <div className="flex items-center">
      {[...Array(6)].map((x, i) => (
        <Circle key={i} isFilled={test.results[i] ? true : false} />
      ))}
    </div>
  );
};

type CircleProps = {
  isFilled: boolean;
};

const Circle = (props: CircleProps) => {
  return (
    <span
      className={`mx-2 h-4 w-4 rounded-full border-2 border-solid border-white transition-colors duration-200 ${
        props.isFilled ? "bg-white" : "bg-black"
      }`}
    ></span>
  );
};
