import * as Discord from "discord.js";

/**
 * A Command interface. Used for defining and handling commands.
 */
interface Command {
    name: string;
    description: string;
    usage: string[];
    execute: (message: Discord.Message) => void;
}

export default Command;