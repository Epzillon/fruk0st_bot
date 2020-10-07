import * as Discord from "discord.js";

import { Command } from "../../models/commands";

const react: Command = {
    name: "react",
    description: "Sends the reaction image <name>.",
    parameters: ["name"],
    execute: executeReact,
};

function executeReact(message: Discord.Message): void {
    const channel = message.channel;
    const parameters = message.content.split(" ");
    const name = parameters[1];
}

export default react;
