import React, { useContext } from "react";
import { TestContext } from "../../context/TestContext";
import { calculateWpm } from "../../lib/test-stats";

export const Result = () => {
  const { test } = useContext(TestContext);
  return (
    <h2 className="text-4xl font-semibold text-white">
      {/* getting the latest test result */}
      {test.results[test.results.length - 1]}
      <span className="text-2xl"> wpm</span>
    </h2>
  );
};
