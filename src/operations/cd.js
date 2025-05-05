import process from "node:process";

export function runCd(pathname) {
  try {
    process.chdir(pathname);
  } catch (err) {
    console.log("Operation failed");
  }
}
