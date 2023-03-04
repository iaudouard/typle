import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { prisma } from "~/server/db";
import { createTest } from "~/utils/create-test";

export default async function createTestCron(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.key !== process.env.CRON_KEY) {
    res.status(404).end();
    return;
  }
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/words.json", "utf8");

  const words: string[] = JSON.parse(fileContents).commonWords;

  const newTest = createTest(words);

  await prisma.test.create({
    data: {
      body: newTest,
    },
  });
  res.status(200).json({ success: true, test: newTest });
}
