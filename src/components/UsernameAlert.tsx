import React, { useState } from "react";

import { transition, variants } from "../constants/animation-values";
import { useUsernameAlert } from "../hooks/useUsernameAlert";
import { setLocalUsername } from "../lib/local-storage";

import { FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export const UsernameAlert = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");

  const { alertUsername, setAlertUsername } = useUsernameAlert();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const handleIgnoreAlert = () => {
    setLocalUsername("");
    setAlertUsername(false);
    toast.error(
      "you have not created a username, your scores will appear under the name 'guest user' on our leaderboards."
    );
  };

  const handleSubmit = () => {
    if (usernameInput.length > 2) {
      setLocalUsername(usernameInput);
      setAlertUsername(false);
    } else {
      handleIgnoreAlert();
    }
  };

  const handleClose = () => {
    handleIgnoreAlert();
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      transition={transition}
      className={`bg-blur fixed  z-30 h-screen w-screen items-center justify-center ${
        alertUsername ? "flex" : "hidden"
      }`}
    >
      <IoMdClose
        color="white"
        size={32}
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleClose}
      />
      <div className="flex w-52 flex-col rounded-lg bg-black p-4">
        <div className="flex items-center justify-between">
          <input
            autoFocus
            onChange={handleInputChange}
            className="bb-solid w-36 bg-transparent p-1 text-white caret-white outline-none"
            placeholder="username?"
          ></input>
          <FiChevronRight
            color="white"
            size={24}
            className="ml-2 cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </motion.section>
  );
};
