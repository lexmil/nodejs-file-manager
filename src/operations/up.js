import process from "node:process";

export function runUp() {
  try {
    process.chdir("..");
  } catch (err) {
    console.log("Operation failed");
  }
}
