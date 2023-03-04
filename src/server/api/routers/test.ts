import { Result, Test } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No test found",
      });
    }
    return test;
  }),
  getUserResults: protectedProcedure.query(
    async ({ ctx }): Promise<Result[]> => {
      const results = await prisma.$transaction(async (tx) => {
        const test = await tx.test.findFirst({
          orderBy: {
            createdAt: "desc",
          },
        });
        if (!test) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No test found",
          });
        }

        const leaderboard = await tx.result.findMany({
          where: {
            testId: test.id,
            userId: ctx.session.user.id,
          },
          orderBy: {
            wpm: "desc",
          },
        });

        return leaderboard;
      });
      return results;
    }
  ),
  postResult: protectedProcedure
    .input(
      z.object({
        testId: z.string(),
        wpm: z.number(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Result> => {
      const newResult = await prisma.$transaction(async (tx) => {
        const currResults = await tx.result.findMany({
          where: {
            testId: input.testId,
            userId: ctx.session.user.id,
          },
        });

        if (currResults.length >= 6) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You have already taken this test 6 times",
          });
        }

        const testResult = await tx.result.create({
          data: {
            testId: input.testId,
            userId: ctx.session.user.id,
            wpm: input.wpm,
          },
        });

        return testResult;
      });

      return newResult;
    }),
});
