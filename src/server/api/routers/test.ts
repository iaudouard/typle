import { Test } from "@prisma/client";
import { z } from "zod";
import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  get: publicProcedure.query(async (): Promise<Test> => {
    const test = await prisma.test.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!test) {
      throw new Error("No test found");
    }
    return test;
  }),
  postResult: protectedProcedure
    .input(
      z.object({
        testId: z.string(),
        wpm: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // write a prisma query to create a new test result
      const testResult = await prisma.result.create({
        data: {
          testId: input.testId,
          userId: ctx.session.user.id,
          wpm: input.wpm,
        },
      });

      return testResult;
    }),
});
