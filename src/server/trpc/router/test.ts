import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";
import path from "path";
import { promises as fs } from "fs";
import { createTest } from "../../test-utils/createTest";

export const testRouter = router({
  // Create publicProcedure at path 'hello'
  get: publicProcedure.query(async () => {
    const tests = await prisma.test.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      tests: tests,
    };
  }),
  create: publicProcedure.query(async () => {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "json");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      jsonDirectory + "/words.json",
      "utf8"
    );

    const words: string[] = JSON.parse(fileContents).commonWords;
    // const newTest = createTest()

    const newTest = createTest(words);
    // console.log(newTest);

    const pushTest = await prisma.test.create({
      data: {
        test: newTest,
      },
    });

    return {
      words: fileContents,
    };

    // const addTest = await prisma.test.
  }),
});
