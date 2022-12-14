import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { trpc } from "../lib/trpc";

import "../styles/globals.css";
import TestContextProvider from "../context/TestContext";
import { Header } from "../components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <TestContextProvider>
          <Header />
          <Component {...pageProps} />
        </TestContextProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);
