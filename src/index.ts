// Imports
import * as Discord from "discord.js";
import chalk from "chalk";
import constants from "./modules/constants";
import Logger from "./modules/io/Logger";

import MessageHandler from "./modules/handlers/message";

// Create client interface and prepare handler
const client = new Discord.Client();
const mh = new MessageHandler();

// Logs ready message
client.on("ready", () => {
    Logger.success("Fruk0st Bot is now serving lunch!");

    if (constants.NODE_ENV === "dev") {
        Logger.info("Developer mode is enabled.");
        Logger.warning("DO NOT USE DEVELOPER MODE IN PRODUCTION.");
    }
});

// Handle commands
client.on("message", (message) => {
    if (constants.NODE_ENV === "dev") {
        if (message.author.id === constants.DEV_ID) {
            mh.handle(message);
        }
    } else if (!message.author.bot) {
        mh.handle(message);
    }
});

client.login(constants.DISCORD_TOKEN);
