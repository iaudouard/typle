import { router, publicProcedure } from "../trpc";
// import { z } from "zod";
import { prisma } from "../../db/client";

export const testRouter = router({
  // Create publicProcedure at path 'hello'
  get: publicProcedure.query(async () => {
    const tests = await prisma.test
      .findMany({
        orderBy: {
          createdAt: "desc",
        },
      })
      .catch((err) => {
        throw err;
      });
    return {
      tests: tests,
    };
  }),
});
