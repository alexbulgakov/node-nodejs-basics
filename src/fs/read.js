import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
  //* Define the file path
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    //* Check if the file exists
    await fs.access(filePath);
    //* Read the file content
    const content = await fs.readFile(filePath, "utf8");
    console.log(content);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
