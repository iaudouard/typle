import Head from "next/head";
import React, { useContext } from "react";
import { Loading } from "../components/Loading";
import { TestContext } from "../context/TestContext";
import { trpc } from "../lib/trpc";

const Leaderboard = () => {
  const { test } = useContext(TestContext);
  const leaderboard = trpc.leaderboard.get.useQuery({ testId: test.id });

  if (!leaderboard.data) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>leaderboard - typle.</title>
        <meta
          name="description"
          content="Leaderboard page for typle - a Wordle-like typing game with global leaderboard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="page-container items-center justify-center">
        <ul>
          {leaderboard.data.leaderboard.map((testResult, i) => {
            return (
              <li key={i} className="text-2xl font-semibold text-white">
                {`${i + 1}. ${testResult.wpm}`}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Leaderboard;
