import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";

export const runDecompress = async (sourcePathname, destinationPathname) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(sourcePathname);
    const writable = createWriteStream(destinationPathname);
    const brotliDecompress = createBrotliDecompress();

    readable
      .on("error", () => {
        console.log("Operation failed");
        reject();
      })
      .pipe(brotliDecompress)
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
