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
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
function executeHelp(message: Discord.Message): void {
    // Only serve commands if .env COMMAND_PREFIX is set.
    if (process.env.COMMAND_PREFIX) {
        const author = message.author;
        const prefix = process.env.COMMAND_PREFIX;
        const helpText = "Hello, fellow fika consumer. Here is the bot's available commands.\n\n";

        const commandDescriptions = commands.map((command) => {
            const prefixedName = prefix + command.name;
            const parameters = command.parameters.map((param) => ` <${param}>`).join("");

            return `${prefixedName + parameters} - ${command.description}`;
        });

        // Send the help text to user who called "help" in DM.
        author.send(helpText + commandDescriptions.join("\n"));
    }
}

export default help;
