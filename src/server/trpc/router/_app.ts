import { router } from "../trpc";
import { authRouter } from "./auth";
import { testRouter } from "./test";

export const appRouter = router({
  test: testRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
