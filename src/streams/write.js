import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  // Create a write stream for the file
  const writeStream = fs.createWriteStream(filePath);

  // Pipe the standard input to the write stream
  process.stdin.pipe(writeStream);
  // When the standard input ends, end the write stream
  process.stdin.on("end", () => writeStream.end());
};

await write();
