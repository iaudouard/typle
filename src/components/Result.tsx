import { motion } from "framer-motion";
import React, { useContext } from "react";
import { transition, variants } from "../constants/animation-values";
import { TestContext } from "../context/TestContext";

// type Props = {};

export const Result = () => {
  const test = useContext(TestContext);
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transition}
      variants={variants}
      className="flex flex-col items-center justify-center"
    >
      <h2 className="text-3xl font-semibold text-white">Results</h2>
      <div className="flex">
        {test.results.map((score, i) => {
          return (
            <h4 key={i} className="m-4 text-xl font-medium text-white">
              {score}
            </h4>
          );
        })}
      </div>
    </motion.section>
  );
};
