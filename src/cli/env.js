const parseEnv = () => {
  //* Get all keys from the environment
  const envKeys = Object.keys(process.env);

  //* Filter keys that start with "RSS_"
  const rssKeys = envKeys.filter((key) => key.startsWith("RSS_"));

  //* Map the matching keys to a string and join with a semicolon
  const rssVars = rssKeys.map((key) => `${key}=${process.env[key]}`).join("; ");

  console.log(rssVars);
};

parseEnv();
