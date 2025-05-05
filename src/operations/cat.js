import { createReadStream } from "node:fs";
import path from "node:path";
import process from "node:process";

export const runCat = async (pathname) => {
  const fullPath = path.resolve(process.cwd(), pathname);

  return new Promise((resolve, reject) => {
    const stream = createReadStream(fullPath, { encoding: "utf-8" });

    stream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    stream.on("end", resolve);

    stream.on("error", () => {
      console.log("Operation failed");
      reject();
    });
  });
};
