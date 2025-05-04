import fs from "node:fs";
import crypto from "node:crypto";

export function getHash(path) {
  const hash = crypto.createHash("sha256");

  const stream = fs.createReadStream(path);

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
}
