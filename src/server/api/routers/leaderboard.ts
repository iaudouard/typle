import { Result } from "@prisma/client";
import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const leaderboardRouter = createTRPCRouter({
  get: publicProcedure.query(async (): Promise<Result[]> => {
    const test = await prisma.test.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!test) {
      throw new Error("No test found");
    }

    const leaderboard = await prisma.result.findMany({
      where: {
        testId: test.id,
      },
      orderBy: {
        wpm: "desc",
      },
      take: 10,
    });
    return leaderboard;
  }),
});
