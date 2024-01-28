import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const list = async () => {
  //* Define the directory path
  const dirPath = path.join(__dirname, "files");

  try {
    //* Check if the directory exists
    await fs.access(dirPath);

    //* Read the files in the directory
    const files = await fs.readdir(dirPath);

    //* Log the list of files
    console.log(files);
  } catch (error) {
    //* Throw an error if the file system operation fails
    throw new Error("FS operation failed");
  }
};

await list();
