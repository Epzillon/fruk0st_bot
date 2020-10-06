import * as Discord from "discord.js";

import commands from "../commands/commands";
import help from "../commands/help";

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
        let commandStr = message.content.split(" ").shift();
        let command = commands.find(command => command.name === commandStr);
        
        // Run command if it exists else run help command
        if (command !== undefined) {
            command.execute(message);
        } else {
            help.execute(message);
        };
    }
};

export default CommandHandler;