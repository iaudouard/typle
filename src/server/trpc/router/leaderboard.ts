import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";

export const leaderboardRouter = router({
  get: publicProcedure
    .input(
      z.object({
        testId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const leaderboard = await prisma.testResult.findMany({
        where: {
          testId: input.testId,
        },
        orderBy: {
          wpm: "desc",
        },
      });

      return {
        leaderboard: leaderboard,
      };
    }),
});
