import * as Discord from "discord.js";

import Command from "../model/Command";

let react: Command = {
    name: "!react",
    description: "Sends the reaction image <name>.",
    parameters: ["name"],
    execute: executeReact
};

function executeReact(message: Discord.Message): void {
    let channel = message.channel;
    let parameters = message.content.split(" ");
    let name = parameters[1];

    // if fileExists(name) > return file > sendMsg(attachment[file]);
}

export default react;