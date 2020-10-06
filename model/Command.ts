import * as Discord from "discord.js";
import commands from "../commands/commands";

import CommandHandler from "../module/CommandHandler";

/**
 * A Command model. Used for defining and handling commands. 
 */
type Command = {
    name: string;
    description: string;
    parameters: Array<string>;
    execute: (message: Discord.Message) => void;
};

export default Command;