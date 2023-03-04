import { useSession } from "next-auth/react";
import Head from "next/head";
import Spinner from "~/components/spinner";
import { api } from "~/utils/api";

export default function Leaderboard() {
  const leaderboard = api.leaderboard.get.useQuery();
  const { data: sessionData } = useSession();

  if (leaderboard.isLoading && !leaderboard.data) {
    return <Spinner />;
  }
  if (leaderboard.isError)
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-white">Failed to load leaderboard</h1>
      </div>
    );
  return (
    <>
      <Head>
        <title>leaderboard - typle</title>
        <meta name="description" content="typeracer wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        {leaderboard.data && leaderboard.data.length > 0 ? (
          <div className="w-1/4">
            <h1 className="mb-4 text-xl font-semibold text-white">
              Daily Leaderboard:
            </h1>
            <div className="h-[30rem] overflow-auto">
              {leaderboard.data.map((result, index) => (
                <div
                  key={index}
                  className={`mt-2 flex w-full justify-between rounded-md border-2 border-white p-2 font-medium ${
                    result.user.id === sessionData?.user.id
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <h2>{result.user.name}</h2>
                  <h2>{result.wpm}</h2>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-white">No results yet</h1>
        )}
      </main>
    </>
  );
}
