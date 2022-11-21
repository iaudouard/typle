import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

import { motion, AnimatePresence } from "framer-motion";

import { trpc } from "../utils/trpc";
import { Test } from "../components/test/Test";
import { transition, variants } from "../constants/animation-values";
import { getLS } from "../utils/local-storage";

const Home: NextPage = () => {
  const orderedTests = trpc.test.get.useQuery();
  const [isTestShown, setIsTestShown] = useState<boolean>(true);
  useEffect(() => {
    if (orderedTests.data?.tests[0]?.id) {
      const pastTests = getLS(orderedTests.data?.tests[0]?.id);
      if (pastTests) {
        if (JSON.parse(pastTests).length >= 6) {
          setIsTestShown(false);
        }
      }
    }
  }, [orderedTests]);

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
          {!orderedTests.data ? (
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
          ) : (
            <>
              {isTestShown ? (
                <Test
                  test={orderedTests.data.tests[0]!.test}
                  testId={orderedTests.data.tests[0]!.id}
                />
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
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
