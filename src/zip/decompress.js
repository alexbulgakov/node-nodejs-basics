import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const inputFile = path.join(__dirname, "files", "archive.gz");
  const outputFile = path.join(__dirname, "files", "fileToCompress.txt");

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  //* Create a gunzip transform stream
  const gunzip = zlib.createGunzip();

  //* Pipe the read stream through the gunzip stream and then to the write stream
  readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
