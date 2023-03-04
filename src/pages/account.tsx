import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Account() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>account - typle</title>
        <meta name="description" content="typeracer wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          {sessionData && (
            <span className="text-xl font-semibold text-white">
              Logged in as {sessionData.user?.name}
            </span>
          )}
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </main>
    </>
  );
}
