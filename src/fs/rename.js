import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  //* Define the source and destination paths
  const sourcePath = path.join(__dirname, "files", "wrongFilename.txt");
  const destinationPath = path.join(__dirname, "files", "properFilename.md");

  try {
    //* Check if the source file exists
    await fs.access(sourcePath);

    try {
      //* Check if the destination file already exists
      await fs.access(destinationPath);
      throw new Error("FS operation failed");
    } catch (error) {
      //* If the destination file doesn't exist, rename the source file to the destination path
      if (error.code === "ENOENT") {
        await fs.rename(sourcePath, destinationPath);
      } else {
        //* If an error occurs, throw the error
        throw error;
      }
    }
  } catch (error) {
    //* If an error occurs while accessing the source file, throw the error
    throw new Error("FS operation failed");
  }
};

await rename();
