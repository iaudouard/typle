import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";

import { Nav } from "~/components/nav";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Nav />
      <Component {...pageProps} />
      <Toaster />
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
