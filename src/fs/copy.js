import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const sourceDir = path.join(__dirname, "files");
  const destinationDir = path.join(__dirname, "files_copy");

  try {
    await fs.access(sourceDir);
    try {
      await fs.access(destinationDir);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.cp(sourceDir, destinationDir, { recursive: true });
      } else {
        throw error;
      }
    }
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();
