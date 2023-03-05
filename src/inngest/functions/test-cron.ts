import { promises as fs } from "fs";
import { InngestFunction } from "inngest/components/InngestFunction";
import path from "path";
import { prisma } from "~/server/db";
import { createTest } from "~/utils/create-test";
import { inngest } from "../client";

const fn: InngestFunction<any> = inngest.createFunction(
  { name: "test update cron" },
  { cron: "0 0 * * *" },
  async () => {
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
        body: newTest,
      },
    });
    return newTest;
  }
);
export default fn;
