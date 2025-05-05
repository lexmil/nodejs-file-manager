import { open } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export const runAdd = async (pathname) => {
  try {
    const fullPath = path.resolve(process.cwd(), pathname);
    const fileHandle = await open(fullPath, "a");
    await fileHandle.close();
  } catch (err) {
    console.log("Operation failed");
  }
};
