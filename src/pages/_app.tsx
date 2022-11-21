import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import TestContextProvider from "../context/TestContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TestContextProvider>
        <Component {...pageProps} />
        <Analytics />
      </TestContextProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
