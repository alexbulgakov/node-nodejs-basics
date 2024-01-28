import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const create = async () => {
  //* Define the file path
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    //* Check if the file exists
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    //* If the file does not exist, write to the file
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, "I am fresh and young");
    } else {
      throw error;
    }
  }
};

await create();
