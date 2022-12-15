import { type NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

import { Test } from "../components/test/Test";
import { Result } from "../components/Result";
import { TestContext } from "../context/TestContext";
import { UsernameAlert } from "../components/UsernameAlert";

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
        <UsernameAlert />
        <section className="flex flex-grow items-center justify-center">
          <>{isTestShown ? <Test /> : <Result />}</>
        </section>
      </main>
    </>
  );
};

export default Home;
