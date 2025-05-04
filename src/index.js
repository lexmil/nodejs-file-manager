import os from "node:os";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import { readdir, stat } from "node:fs/promises";

import {
  getOsEOL,
  getOsCups,
  getOsHomedir,
  getOsUsername,
  getOsArchitecture,
} from "./operations/os.js";

import { printCurrentDirectory } from "./utils/path.js";
import { drawBox } from "./utils/box.js";
import { getHash } from "./operations/hash.js";
import { runLs } from "./operations/ls.js";

const args = process.argv.slice(2);

const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";
const userHomeDir = os.homedir();
const currentDir = process.cwd();

process.chdir(userHomeDir);

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
    case "up": {
      process.chdir("..");
      break;
    }
    case "ls": {
      await runLs(path.resolve(currentDir));
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
          console.log("Invalid option, try again.");
          console.log(
            "Available options: --EOL, --cups, --homedir, --username, --architecture",
          );
        }
      }
      break;
    }
    case "hash": {
      try {
        getHash(path.resolve(process.cwd(), arg1));
      } catch (err) {
        console.log("Invalid option, try again.");
        console.log("Available format: hash <path_to_file>");
      }
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
  printCurrentDirectory();
  rl.prompt();
});

// Handle Ctrl+C (SIGINT)
process.on("SIGINT", exitHandler);

// Exit function
function exitHandler() {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}
