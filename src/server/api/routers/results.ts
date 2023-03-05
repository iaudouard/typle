import { Result, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const resultsRouter = createTRPCRouter({
  getLeaderboard: publicProcedure.query(
    async (): Promise<{ user: User | null; wpm: number; id: string }[]> => {
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

      const leaderboard = await prisma.result.findMany({
        where: {
          testId: test.id,
        },
        select: {
          user: true,
          wpm: true,
          id: true,
        },
        orderBy: {
          wpm: "desc",
        },
      });

      return leaderboard;
    }
  ),
  post: publicProcedure
    .input(
      z.object({
        testId: z.string(),
        wpm: z.number(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Result> => {
      const newResult = await prisma.$transaction(async (tx) => {
        if (input.wpm > 300) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are cheating",
          });
        }

        if (ctx.session) {
          const currResults = await tx.result.findMany({
            where: {
              testId: input.testId,
              userId: ctx.session.user.id,
            },
          });
          if (currResults.length >= 5) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "You have already taken this test 5 times",
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
        } else {
          const testResult = await tx.result.create({
            data: {
              testId: input.testId,
              userId: undefined,
              wpm: input.wpm,
            },
          });
          return testResult;
        }
      });

      return newResult;
    }),

  updateResults: protectedProcedure
    .input(
      z.array(
        z.object({
          testId: z.string(),
          id: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.$transaction(async (tx) => {
        for (const test of input) {
          const currResults = await tx.result.findMany({
            where: {
              testId: test.testId,
              userId: ctx.session.user.id,
            },
          });
          if (currResults.length >= 5) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "You have already taken this test 5 times",
            });
          }
          const updatedResult = await tx.result.updateMany({
            where: {
              testId: test.testId,
              userId: null,
              id: test.id,
            },
            data: {
              userId: ctx.session.user.id,
            },
          });
        }
      });
    }),
});
