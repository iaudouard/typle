import { motion } from "framer-motion";
import React, { useState } from "react";
import { transition, variants } from "../constants/animation-values";
import { useIsUsernameCreated } from "../hooks/useIsUsernameCreated";
import { setLocalUsername } from "../lib/local-storage";

export const UsernameAlert = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");

  const isUsernameCreated = useIsUsernameCreated();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const handleSubmit = () => {
    setLocalUsername(usernameInput);
  };
  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      transition={transition}
      className={`fixed z-30  h-screen w-screen items-center justify-center bg-transparent ${
        isUsernameCreated ? "hidden" : "flex"
      }`}
    >
      <button>Close</button>
      <div className="flex flex-col items-center rounded-sm bg-black p-4">
        <h4 className="mb-4 text-xl font-semibold text-white">username?</h4>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            onChange={handleInputChange}
            className="border-2 border-solid border-white bg-transparent p-2 text-white caret-white outline-none"
          ></input>
        </form>
      </div>
    </motion.section>
  );
};
