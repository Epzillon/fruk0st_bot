// Imports
import * as Discord from "discord.js";
import dotenv from "dotenv";
import chalk from "chalk";

// Loads env variables from a .env file
dotenv.config();

// If we are missing the discord token, throw error
if ((process.env.DISCORD_TOKEN || "").length === 0) {
    console.error(chalk.red("Missing .env variable 'DISCORD_TOKEN'. Create .env file or add it to the environment"));
    process.exit(1);
}

import MessageHandler from "./modules/handlers/message";

// Create client interface and prepare handler
const client = new Discord.Client();
const mh = new MessageHandler();

// Logs ready message
client.on("ready", () => {
    console.log(chalk.green("Fika Bot is now serving dammsugare!"));
});

// Handle commands
client.on("message", (message) => {
    // Only listen to developer message in development mode.
    if (process.env.NODE_ENV === "dev") {
        if (message.author.id === process.env.DEV_ID) {
            mh.handle(message);
        }
        // Never listen to other bots
    } else if (!message.author.bot) {
        mh.handle(message);
    }
});

// Login bot with token
client.login(process.env.DISCORD_TOKEN);
