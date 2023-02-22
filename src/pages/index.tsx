import { type NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

import { ResultsChart } from "../components/ResultsChart";
import { Test } from "../components/test/Test";
import { TestContext } from "../context/TestContext";

const Home: NextPage = () => {
  const { isTestShown } = useContext(TestContext);

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
      <main className="page-container flex-col items-center justify-center">
        <section className="flex flex-grow items-center justify-center">
          <>{isTestShown ? <Test /> : <ResultsChart />}</>
        </section>
      </main>
    </>
  );
};

export default Home;
