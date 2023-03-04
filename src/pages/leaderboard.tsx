import Head from "next/head";
import Spinner from "~/components/spinner";
import { api } from "~/utils/api";

export default function Leaderboard() {
  const leaderboard = api.leaderboard.get.useQuery();

  if (leaderboard.isLoading && !leaderboard.data) {
    return <Spinner />;
  }
  return (
    <>
      <Head>
        <title>leaderboard - typle</title>
        <meta name="description" content="typeracer wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        {leaderboard.data?.map((result, index) => (
          <div key={index}>
            <h2 className="text-white">{result.wpm}</h2>
          </div>
        ))}
      </main>
    </>
  );
}
