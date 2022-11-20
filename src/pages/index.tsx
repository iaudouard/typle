import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Test } from "../components/test/Test";

import autoAnimate from "@formkit/auto-animate";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const orderedTests = trpc.test.get.useQuery();

  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (orderedTests.data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [orderedTests]);

  return (
    <>
      <Head>
        <title>typle</title>
        <meta
          name="description"
          content="Wordle-like typing game with global leaderboard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <h1 className="absolute top-4 text-4xl font-bold text-white">typle.</h1>
        <section
          ref={parent}
          className="flex flex-grow items-center justify-center"
        >
          {isLoading ? (
            <h1 className=" text-3xl font-semibold text-white">Loading...</h1>
          ) : (
            <>
              <Test test={orderedTests.data!.tests[0]!.test!} />
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
