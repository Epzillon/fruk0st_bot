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

        // If message begins with the command prefix call command handler.
        if (process.env.COMMAND_PREFIX && content.startsWith(process.env.COMMAND_PREFIX)) {
            this.ch.handle(message);
        }
    }
}

export default MessageHandler;
