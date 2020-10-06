import * as Discord from "discord.js";

import CommandHandler from "./CommandHandler";

/**
 * Handler for messages. Used on Discord.Client "message" events.
 */
class MessageHandler {
    private ch = new CommandHandler();
    /**
     * Handles messages in Discord.
     *
     * @param message A Discord message of the Discord.Message class.
     */
    public handle(message: Discord.Message) {
        let content = message.content; 
        
        // If message begins with "!" call command handler.
        if (content[0] === "!") {
            this.ch.handle(message);
        }
    }
}

export default MessageHandler;