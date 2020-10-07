import * as Discord from "discord.js";

import CommandHandler from "./command";

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
        const content = message.content;

        // If message begins with "!" call command handler.
        if (content.startsWith("!")) {
            this.ch.handle(message);
        }
    }
}

export default MessageHandler;
