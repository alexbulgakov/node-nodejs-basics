import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
  //* Construct the path to the script
  const scriptPath = path.join(__dirname, "files", "script.js");

  //* Spawn a child process with the node command and the script path along with the arguments
  const child = spawn("node", [scriptPath, ...args], {
    //* Set the stdio options for the child process
    stdio: ["pipe", "inherit", "inherit", "ipc"],
  });

  //* Pipe the current process's stdin to the child process's stdin
  process.stdin.pipe(child.stdin);

  child.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });
  child.on("exit", (code, signal) => {
    console.log(`Child process exited with code ${code}, signal ${signal}`);
  });
};

spawnChildProcess(["arg1", "arg2"]);
