import * as Discord from "discord.js";
import fs from "fs";
import * as io from "../../io";
import Path from "path";

import CommandInterface  from "../../../models/CommandInterface";
import settings from "../../../settings.json";

import constants from "../../constants";

class Poll implements CommandInterface {
    public name = "poll";
    public description = "Allows you to manage polls.";
    public usage = ["create <?date> <time> <answers>", "delete <id>", "<id>"];

    /**
     * Handles the execution of the "react" command and its sub-commands.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public execute(message: Discord.Message): void {
        const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
        const parameters = commandStr.split(" ");

        // Switch based on sub-command
        switch (parameters[1]) {
            default:
                break;
        }
    }
}

export default Poll;
