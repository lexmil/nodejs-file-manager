import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import process from "node:process";

export function runHash(pathname) {
  try {
    const hash = crypto.createHash("sha256");

    const stream = fs.createReadStream(path.resolve(process.cwd(), pathname));

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      const digest = hash.digest("hex");
      console.log(`SHA-256 hash: ${digest}`);
    });

    stream.on("error", (err) => {
      console.log(err.message);
    });
  } catch (err) {
    console.log("Operation failed");
  }
}
