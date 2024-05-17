import path from "node:path";
import os from "node:os";
import { createServer } from "node:http";
import "./files/c.js";

const random = Math.random();

let unknownObject;
async function loadUnknownObject() {
  if (random > 0.5) {
    const module = await import("./files/a.json");
    unknownObject = module.default;
  } else {
    const module = await import("./files/b.json");
    unknownObject = module.default;
  }
}

async function main() {
  await loadUnknownObject();

  console.log(`Release ${os.release()}`);
  console.log(`Version ${os.version()}`);
  console.log(`Path segment separator is "${path.sep}"`);

  console.log(`Path to current file is ${import.meta.url}`);
  console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

  const myServer = createServer((_, res) => {
    res.end("Request accepted");
  });

  const PORT = 3000;

  console.log(unknownObject);

  myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
  });

  return { unknownObject, myServer };
}

main().catch((error) => console.error(error));

export { unknownObject, myServer };
