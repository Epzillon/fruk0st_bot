// Imports
import * as Discord from "discord.js";

import * as auth from "./auth/auth.json";
import * as settings from "./settings/settings.json";

import MessageHandler from "./module/MessageHandler";

// Creates client interface
let client = new Discord.Client();
let mh = new MessageHandler();

// Logs ready message
client.on('ready', () => {
    console.log("Fika Bot is now serving dammsugare!");
});

// Handle commands
client.on("message", (message) => {
    mh.handle(message);
});

// Login bot with token
client.login(auth.token);