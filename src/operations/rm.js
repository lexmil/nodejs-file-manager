import { unlink } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export const runRm = async (pathname) => {
  try {
    const fullPath = path.resolve(process.cwd(), pathname);
    await unlink(fullPath);
  } catch (err) {
    console.log("Operation failed");
  }
};
