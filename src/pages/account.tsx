import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function Account() {
  const { data: sessionData } = useSession();
  const update = api.results.updateResults.useMutation({
    onSuccess: () => {
      toast.success("Successfully uploaded browser results", {
        id: "results-save-success",
      });
      localStorage.removeItem("results");
    },
    onError: (error) => {
      toast.error("Failed to upload browser results: " + error.message, {
        id: "results-save-error",
      });
      if (error.data?.code === "UNAUTHORIZED") {
        localStorage.removeItem("results");
      }
    },
  });

  useEffect(() => {
    if (sessionData) {
      const results = localStorage.getItem("results");
      if (results) {
        const parsedResults = JSON.parse(results);
        update.mutateAsync(parsedResults);
      }
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>account - typle</title>
        <meta name="description" content="typeracer wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className="flex min-h-screen flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col gap-4">
          {sessionData && (
            <span className="text-xl font-semibold text-white">
              Logged in as {sessionData.user.name}
            </span>
          )}
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </motion.main>
    </>
  );
}
