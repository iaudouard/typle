import { Test } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
});
