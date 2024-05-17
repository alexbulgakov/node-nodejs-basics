import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  //* Define the file path
  const filePath = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    //* Check if the file exists
    await fs.access(filePath);

    //* Remove the file
    await fs.rm(filePath);
  } catch (error) {
    //* Throw error if any file system operation fails
    throw new Error("FS operation failed");
  }
};

await remove();
