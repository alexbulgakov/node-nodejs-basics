import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const inputFile = path.join(__dirname, "files", "fileToCompress.txt");
  const outputFile = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  //* Create gzip transform stream
  const gzip = zlib.createGzip();

  //* Pipe the read stream through gzip and then to the write stream
  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
