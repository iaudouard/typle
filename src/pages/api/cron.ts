import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import path from "path";
import { promises as fs } from "fs";
import { createTest } from "../../server/test-utils/create-test";

export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), "json");
        //Read the json data file data.json
        const fileContents = await fs.readFile(
          jsonDirectory + "/words.json",
          "utf8"
        );

        const words: string[] = JSON.parse(fileContents).commonWords;

        const newTest = createTest(words);

        await prisma.test.create({
          data: {
            test: newTest,
          },
        });
        res.status(200).json({ success: true, test: newTest });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
