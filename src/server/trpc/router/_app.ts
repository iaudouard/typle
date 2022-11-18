import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { testRouter } from "./test";

export const appRouter = router({
  example: exampleRouter,
  test: testRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
