import { motion } from "framer-motion";
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
      <motion.main
        className="flex min-h-screen flex-col items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {leaderboard.data && leaderboard.data.length > 0 ? (
          <div className="w-3/4 lg:w-1/2">
            <h1 className="mb-4 text-xl font-semibold text-white">
              Daily Leaderboard:
            </h1>
            <div className="h-[30rem] overflow-auto">
              {leaderboard.data.map((result, index) =>
                result.user ? (
                  <div
                    key={index}
                    className={`mt-2 flex w-full justify-between rounded-md border-2 border-white p-2 font-medium ${
                      result.user.id === sessionData?.user.id
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={
                          result.user.image
                            ? result.user.image
                            : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                        }
                        alt=""
                        className="w-6 rounded-full"
                      />
                      <h2>{result.user.name}</h2>
                    </div>
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
                    <div className="flex gap-4">
                      <img
                        src={
                          "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                        }
                        alt=""
                        className="w-6 rounded-full"
                      />

                      <h2 className="italic">guest</h2>
                    </div>
                    <h2>{result.wpm}</h2>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <h1 className="text-white">No results yet</h1>
        )}
      </motion.main>
    </>
  );
}
