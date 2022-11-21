import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

import { motion } from "framer-motion";

import { trpc } from "../utils/trpc";
import { Test } from "../components/test/Test";
import { transition, variants } from "../constants/animation-values";
import { getLS } from "../utils/local-storage";
import { useContext } from "react";
import { TestContext } from "../context/TestContext";

const Home: NextPage = () => {
  const [isTestShown, setIsTestShown] = useState<boolean>(true);

  const test = useContext(TestContext);

  const updateTestShown = (arg: boolean) => {
    setIsTestShown(arg);
  };

  return (
    <>
      <Head>
        <title>typle.</title>
        <meta
          name="description"
          content="Wordle-like typing game with global leaderboard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <h1 className="absolute top-4 text-4xl font-bold text-white">typle.</h1>
        <section className="flex flex-grow items-center justify-center">
          <>
            {isTestShown ? (
              <Test updateTestShown={updateTestShown} />
            ) : (
              <motion.h1
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={transition}
                variants={variants}
                className=" text-3xl font-semibold text-white"
              >
                No Mo
              </motion.h1>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default Home;
