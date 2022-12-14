import { router } from "../trpc";
import { authRouter } from "./auth";
import { leaderboardRouter } from "./leaderboard";
import { testRouter } from "./test";

export const appRouter = router({
  test: testRouter,
  auth: authRouter,
  leaderboard: leaderboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
