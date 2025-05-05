import { rename } from "node:fs/promises";

export const runRn = async (oldPathname, newPathname) => {
  try {
    await rename(oldPathname, newPathname);
  } catch (err) {
    console.log("Operation failed");
  }
};
