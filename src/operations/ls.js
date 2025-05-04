import { readdir, stat } from "node:fs/promises";
import process from "node:process";
import path from "node:path";

export const runLs = async (dirPath) => {
  try {
    console.log("Listing files...", dirPath);
    const files = await readdir(dirPath);
    const filesInfo = await Promise.all(
      files.map(async (file) => {
        const stats = await stat(path.join(process.cwd(), file));
        return {
          name: file,
          type: stats.isDirectory() ? "directory" : "file",
        };
      }),
    );

    console.table(filesInfo);
  } catch (err) {
    console.log("Operation failed");
  }
};
