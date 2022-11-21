import { motion } from "framer-motion";
import React from "react";
import { transition, variants } from "../constants/animation-values";

type Props = {};

export const Loading = (props: Props) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-black">
      <motion.h1
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        variants={variants}
        className=" text-3xl font-semibold text-white"
      >
        Loading...
      </motion.h1>
    </section>
  );
};
