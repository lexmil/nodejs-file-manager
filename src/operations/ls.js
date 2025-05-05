import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export const runLs = async (pathname) => {
  try {
    const files = await readdir(pathname);

    const filesInfo = await Promise.all(
      files.map(async (file) => {
        const stats = await stat(path.join(pathname, file));

        return {
          name: file,
          type: stats.isDirectory() ? "directory" : "file",
        };
      }),
    );

    filesInfo.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    console.table(filesInfo);
  } catch (err) {
    console.log("Operation failed");
  }
};
