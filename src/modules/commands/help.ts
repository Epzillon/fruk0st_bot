import * as Discord from "discord.js";

import { Command } from "../../models/commands";
import commands from "./index";

const help: Command = {
    name: "help",
    description: "Sends this in DM's.",
    parameters: [],
    execute: executeHelp,
};

/**
 * Sends the list of available commands to the user who called the "!help" command;
 *
 * @param message The Discord.Message which called upon the command.
 */
function executeHelp(message: Discord.Message): void {
    const author = message.author;
    const text = "Hello, pussy. Here's the command list:\n\n";

    // Join each command and description to a list.
    const commandDescriptions = commands.map((command) => `${process.env.COMMAND_PREFIX}${command.name} - ${command.description}`);

    author.send(text + commandDescriptions.join("\n"));
}

export default help;
