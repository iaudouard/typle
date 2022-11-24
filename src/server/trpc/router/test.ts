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
        where: {
          NOT: [{ test: "null" }],
        },
      })
      .catch((err) => {
        throw err;
      });
    return {
      tests: tests,
    };
  }),
  // 'post-result': publicProcedure.mutation()
});
