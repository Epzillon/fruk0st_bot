import Discord from "discord.js";
import CommandInterface from "./CommandInterface";
import Logger from "../modules/io/logger";

class AbstractCommand implements CommandInterface {
    public name = "command";
    public description = "description";
    public usage = ["subcommand1", "subcommand2"];

    public execute(message: Discord.Message): void {
        const author = message.author;

        Logger.info('User "' + author.username + '" executed command "' + message.cleanContent + '".');
    }
}

export default AbstractCommand;
