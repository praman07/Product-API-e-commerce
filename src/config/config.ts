import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET", "IMAGEKIT_PRIVATE_KEY"];

for (const key of requiredEnvVars) {
  const value = process.env[key];

  if (!value?.trim()) {
    throw new Error(`${key} is not provided in the .env file`);
  }
}

const port = Number(process.env.PORT) || 8080;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number between 1 and 65535");
}

// object.freeze() prevents accidental runtime modification of config values
const config = Object.freeze({
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: port,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY as string,
});

export default config;
