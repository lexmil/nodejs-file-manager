import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";

export const runCompress = async (sourcePathname, destinationPathname) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(sourcePathname);
    const writable = createWriteStream(destinationPathname);
    const brotli = createBrotliCompress();

    readable
      .on("error", () => {
        console.log("Operation failed");
        reject();
      })
      .pipe(brotli)
      .on("error", () => {
        console.log("Operation failed");
        reject();
      })
      .pipe(writable)
      .on("error", () => {
        console.log("Operation failed");
        reject();
      })
      .on("finish", resolve);
  });
};
