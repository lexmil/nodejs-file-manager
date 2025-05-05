import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export const runMkdir = async (pathname) => {
  try {
    const fullPath = path.resolve(process.cwd(), pathname);
    await mkdir(fullPath, { recursive: false });
  } catch (err) {
    console.log("Operation failed");
  }
};
