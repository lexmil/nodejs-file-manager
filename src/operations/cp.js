import { createReadStream, createWriteStream, unlink } from "node:fs";

export const runCp = async (
  sourcePathname,
  destinationPathname,
  shouldMove = false,
) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(sourcePathname);
    const writable = createWriteStream(destinationPathname);

    readable.on("error", () => {
      console.log("Operation failed");
      reject();
    });

    writable.on("error", () => {
      console.log("Operation failed");
      reject();
    });

    writable.on("finish", () => {
      if (shouldMove) {
        unlink(sourcePathname, (err) => {
          if (err) {
            console.log("Operation failed");
            reject();
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });

    readable.pipe(writable);
  });
};
