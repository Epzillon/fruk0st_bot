import * as Discord from "discord.js";

import help from "../commands/help";
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
        const command = commands.find((command) => command.name === commandStr);

        // Run command if it exists else run help command
        if (command !== undefined) {
            return command.execute(message);
        }

        help.execute(message);
    }
}

export default CommandHandler;
