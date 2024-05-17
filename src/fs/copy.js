import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  //* Define source and destination directories
  const sourceDir = path.join(__dirname, "files");
  const destinationDir = path.join(__dirname, "files_copy");

  try {
    //* Check if source directory exists
    await fs.access(sourceDir);
    try {
      //* Check if destination directory exists
      await fs.access(destinationDir);
      //* Throw error if destination directory exists
      throw new Error("FS operation failed");
    } catch (error) {
      //* If destination directory does not exist, copy files from source to destination
      if (error.code === "ENOENT") {
        await fs.cp(sourceDir, destinationDir, { recursive: true });
      } else {
        //* If error is not ENOENT, throw the error
        throw error;
      }
    }
  } catch (error) {
    //* If error accessing source directory, throw an error
    throw new Error("FS operation failed");
  }
};

await copy();
