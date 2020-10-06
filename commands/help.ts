import * as Discord from "discord.js";

import Command from "../model/Command";
import commands from "./commands";

let help: Command = {
    name: "!help",
    description: "Sends this in DM's.",
    parameters: [],
    execute: executeHelp
};

/**
 * Sends the list of available commands to the user who called the "!help" command;
 *
 * @param message The Discord.Message which called upon the command.
 */
function executeHelp(message: Discord.Message): void {
    let author = message.author;
    let text = "Hello, pussy. Here's the command list:\n\n";

    // Append each command and description to the list.
    commands.forEach(command => {
        text = text.concat(command.name + " - " + command.description + ".\n");
    });

    author.send(text);
}

export default help;