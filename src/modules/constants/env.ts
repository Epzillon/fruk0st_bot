import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

// Array with all optional env keys
const optionalEnvs: string[] = [];

// Force the values to be strings as they will be validated later
const env = process.env as Record<string, string>;

// All of the exported env variables
const envs = {
    DISCORD_TOKEN: env.DISCORD_TOKEN,
    NODE_ENV: env.NODE_ENV,
    COMMAND_PREFIX: env.NODE_ENV,
    DEV_ID: env.DEV_ID,
};

// Check if the value is an acceptable type or has acceptable properties
const validEnvData = (value: unknown) => {
    if (value === undefined) {
        return false;
    }

    if (typeof value === "string" && value.length === 0) {
        return false;
    }

    return true;
};

// Returns an array of strings with the env key names
const missingEnvs = Object.entries(envs).reduce((acc: string[], [key, value]) => {
    const isMissing = !validEnvData(value);
    const shouldError = isMissing && !optionalEnvs.includes(key);

    if (shouldError) {
        return [...acc, key];
    }

    return acc;
}, []);

if (missingEnvs.length > 0) {
    missingEnvs.forEach((key) => {
        console.error(chalk.red(`missing env variable '${key}'. Set it in the environment or in the .env file`));
    });

    process.exit(1);
}

export default envs;
