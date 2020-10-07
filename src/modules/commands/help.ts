import * as Discord from "discord.js";

import { Command } from "../../models/commands";
import commands from "./index";

const help: Command = {
    name: "help",
    description: "Sends this message in DM's.",
    parameters: [],
    execute: executeHelp,
};

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param message The Discord.Message which called upon the command.
 */
function executeHelp(message: Discord.Message): void {
    const author = message.author;
    const prefix = process.env.COMMAND_PREFIX;
    const helpText = "Hello, fellow fika consumer. Here is the bot's available commands.\n\n";

    // Join each command and description to a list with format "Xcommand <params...> - description".
    const commandDescriptions = commands.map(
        (command) => `${prefix}${command.name}`
            + `${command.parameters.map((param) => ` <${param}>`)}`
            + ` - `
            + `${command.description}`
    );

    // Add command descriptions separated by newline to help text.
    helpText.concat(commandDescriptions.join("\n"));

    // Send the help text to user who called "help" in DM.  
    author.send(helpText);
}

export default help;
