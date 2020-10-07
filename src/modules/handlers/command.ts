import * as Discord from "discord.js";

import commands from "../commands";

/**
 * Handler for commands. Used in the MessageHandler.
 */
class CommandHandler {
    /**
     * Handles a command in Discord.
     *
     * @param message A Discord message of the Discord.Message class.
     */
    public handle(message: Discord.Message) {
        // Structure message content
        const commandStr = message.content.split(" ").shift();
        const command = commands.find((command) => process.env.COMMAND_PREFIX + command.name === commandStr);


        // Run command if it exists
        if (command !== undefined) {
            return command.execute(message);
        }
    }
}

export default CommandHandler;
