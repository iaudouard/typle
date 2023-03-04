import { type NextPage } from "next";
import Head from "next/head";
import Test from "~/components/test";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>typle</title>
        <meta name="description" content="typeracer wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <Test />
      </main>
    </>
  );
};

export default Home;
