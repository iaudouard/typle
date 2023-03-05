import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Spinner from "~/components/spinner";
import { api } from "~/utils/api";

export default function Leaderboard() {
  const leaderboard = api.results.getLeaderboard.useQuery();

  const [localResultIds, setLocalResultIds] = useState<string[]>();
  const { data: sessionData } = useSession();

  useEffect(() => {
    const locals = localStorage.getItem("results");
    if (locals) {
      const parsedResults = JSON.parse(locals);
      const ids = parsedResults.map((result: any) => result.id);
      setLocalResultIds(ids);
    }
  }, [sessionData, setLocalResultIds]);

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
          <div className="w-3/4 lg:w-1/2">
            <h1 className="mb-4 text-xl font-semibold text-white">
              Daily Leaderboard:
            </h1>
            <div className="h-[30rem] overflow-auto">
              {leaderboard.data.map(
                (result, index) =>
                  result.user ? (
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
                  ) : (
                    <div
                      key={index}
                      className={`mt-2 flex w-full justify-between rounded-md border-2 border-white p-2 font-medium ${
                        localResultIds
                          ? localResultIds.includes(result.id)
                            ? "bg-white text-black"
                            : "bg-black text-white"
                          : "bg-black text-white"
                      }`}
                    >
                      <h2 className="italic">guest</h2>
                      <h2>{result.wpm}</h2>
                    </div>
                  )

                // <div
                //   key={index}
                //   className={`mt-2 flex w-full justify-between rounded-md border-2 border-white p-2 font-medium ${
                //     result.user?.id === sessionData?.user.id
                //       ? "bg-white text-black"
                //       : "bg-black text-white"
                //   }`}
                // >
                //   <h2>{result.user ? result.user.name : "guest"}</h2>
                //   <h2>{result.wpm}</h2>
                // </div>
              )}
            </div>
          </div>
        ) : (
          <h1 className="text-white">No results yet</h1>
        )}
      </main>
    </>
  );
}
