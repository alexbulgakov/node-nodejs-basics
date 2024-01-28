const parseArgs = () => {
  //* Get command line arguments excluding the first two (node and script path)
  const args = process.argv.slice(2);

  //* Create an object to store parsed arguments
  const parsedArgs = {};

  //* Iterate through the arguments by twos
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, ""); // Remove leading "--" from the key
    const value = args[i + 1]; // Get the value of the argument
    parsedArgs[key] = value; // Add the key-value pair to the parsedArgs object
  }

  //* Format the parsed arguments
  const formattedArgs = Object.entries(parsedArgs)
    .map(([key, value]) => `${key} is ${value}`)
    .join(", ");

  console.log(formattedArgs);
};

parseArgs();
