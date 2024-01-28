import { Transform } from "node:stream";

const { Transform } = require("stream");

const transform = async () => {
  //* Create a new transform stream
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      //* Reverse the input and send it to the output
      this.push(chunk.toString().split("").reverse().join(""));
      //* Notify the stream that the transformation is complete
      callback();
    },
  });

  /**
   ** Pipe the standard input to the transform stream and then pipe the
   ** transformed output to the standard output
   */
  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
