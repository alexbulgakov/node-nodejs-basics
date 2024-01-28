import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  //* Create a read stream for the file
  const readStream = fs.createReadStream(filePath, "utf8");

  //* Log the file data to the console
  readStream.on("data", (chunk) => process.stdout.write(chunk));

  readStream.on("error", (error) => console.error("Error:", error.message));
};

await read();
