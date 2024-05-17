import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  //* Get the number of CPU cores
  const numCores = os.cpus().length;

  //* Array to store promises
  const promises = [];

  //* Loop through the number of CPU cores
  for (let i = 0; i < numCores; i++) {
    //* Create a new promise for each worker
    const promise = new Promise((resolve, reject) => {
      //* Create a new worker
      const worker = new Worker(new URL("./worker.js", import.meta.url));

      //* Send data to the worker
      worker.postMessage(10 + i);

      //* Listen for messages from the worker
      worker.on("message", (result) => {
        resolve(result);
      });

      //* Listen for errors from the worker
      worker.on("error", (err) => {
        console.error("Worker error:", err);
        reject({ status: "error", data: null });
      });

      //* Listen for worker exit
      worker.on("exit", (code) => {
        //* Handle non-zero exit code
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });

    //* Push the promise to the array
    promises.push(promise);
  }

  try {
    //* Wait for all promises to resolve
    const results = await Promise.all(promises);
    console.log(results);
  } catch (error) {
    //* Handle errors during worker calculations
    console.error("Error during calculations:", error);
  }
};

performCalculations();
