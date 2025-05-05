import os from "node:os";
import process from "node:process";
import readline from "node:readline";

import { printCurrentDirectory } from "./utils/path.js";
import { drawBox } from "./utils/box.js";

import {
  getOsEOL,
  getOsCups,
  getOsHomedir,
  getOsUsername,
  getOsArchitecture,
} from "./operations/os.js";

import {
  runHash,
  runLs,
  runCd,
  runCp,
  runMkdir,
  runUp,
  runCat,
  runAdd,
  runRn,
  runRm,
} from "./operations/index.js";
import { runCompress } from "./operations/compress.js";

const args = process.argv.slice(2);

const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

let currentDir = os.homedir();

process.chdir(currentDir);

drawBox(`Welcome to the File Manager, ${username}!`, true);

printCurrentDirectory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();
rl.on("line", async (line) => {
  const [command, arg1, arg2] = line.trim().split(" ");

  switch (command) {
    case "add": {
      await runAdd(arg1);
      break;
    }
    case "cat": {
      await runCat(arg1);
      break;
    }
    case "cd": {
      runCd(arg1);
      break;
    }
    case "compress": {
      await runCompress(arg1, arg2);
      break;
    }
    case "cp": {
      await runCp(arg1, arg2);
      break;
    }
    case "ls": {
      await runLs(currentDir);
      break;
    }
    case "mkdir": {
      await runMkdir(arg1);
      break;
    }
    case "mv": {
      await runCp(arg1, arg2, true);
      break;
    }
    case "rm": {
      await runRm(arg1);
      break;
    }
    case "rn": {
      await runRn(arg1, arg2);
      break;
    }
    case "up": {
      runUp();
      break;
    }
    case "os": {
      switch (arg1) {
        case "--EOL": {
          getOsEOL();
          break;
        }
        case "--cups": {
          getOsCups();
          break;
        }
        case "--homedir": {
          getOsHomedir();
          break;
        }
        case "--username": {
          getOsUsername();
          break;
        }
        case "--architecture": {
          getOsArchitecture();
          break;
        }
        default: {
          console.log("Operation failed");
          console.log(
            "Available options: --EOL, --cups, --homedir, --username, --architecture",
          );
        }
      }
      break;
    }
    case "hash": {
      runHash(arg1);
      break;
    }
    case ".exit":
      console.log("Exiting...");
      break;
    case ".help":
      console.log("Help");
      break;
    default:
      console.log("Invalid input, try again.");
  }

  console.log("\n");
  currentDir = process.cwd();
  printCurrentDirectory();
  rl.prompt();
});

process.on("SIGINT", exitHandler);

function exitHandler() {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}
