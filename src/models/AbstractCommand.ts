import Discord from "discord.js";
import CommandInterface from "models/CommandInterface";
import Logger from "modules/io/Logger";
import constants from "modules/constants";

class AbstractCommand implements CommandInterface {
    public name = "command";
    public description = "description";
    public usage = ["subcommand1", "subcommand2"];
    protected commandString = "";
    protected commandParameters = [""];

    public execute(message: Discord.Message): void {
        const author = message.author;
        this.commandString = message.content.split(constants.COMMAND_PREFIX)[1];
        this.commandParameters = this.commandString.split(" ");

        Logger.info('User "' + author.username + '" executed command "' + message.cleanContent + '".');
    }

    protected getCommandParameters() {
        return this.commandParameters;
    }
}

export default AbstractCommand;
