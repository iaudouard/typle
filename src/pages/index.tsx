import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Test } from "../components/Test";

const Home: NextPage = () => {
  const orderedTests = trpc.test.get.useQuery();
  // const commonWords = trpc.test.create.useQuery();

  if (!orderedTests.data) {
    return (
      <main className="flex h-screen items-center justify-center bg-black">
        <h1 className=" text-2xl font-semibold text-white">Loading...</h1>
      </main>
    );
  }

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
        <Test testString={orderedTests.data.tests[0]?.test} />
      </main>
    </>
  );
};

export default Home;
