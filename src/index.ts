// Imports
import * as Discord from "discord.js";

// import auth from './auth/auth.json'
// import settings from './settings/settings.json'

import MessageHandler from "./modules/handlers/message";

// Creates client interface
const client = new Discord.Client();
const mh = new MessageHandler();

// Logs ready message
client.on("ready", () => {
    console.log("Fika Bot is now serving dammsugare!");
});

// Handle commands
client.on("message", (message) => {
    mh.handle(message);
});

// Login bot with token
// client.login(auth.token);
