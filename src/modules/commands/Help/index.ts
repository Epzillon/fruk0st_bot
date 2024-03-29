import * as Discord from "discord.js";
import AbstractCommand from "models/AbstractCommand";
import HelpService from "modules/commands/Help/Service/HelpService";

class Help extends AbstractCommand {
    public name = "help";
    public description = "Sends this message in DM's";
    public usage = [""];

    /**
     * Sends the list of available commands to the user who called the "help" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        super.execute(message);

        const commandParameters = super.getCommandParameters();

        switch (commandParameters[1]) {
            default:
                HelpService.sendHelpMessage(message.author);
                break;
        }
    }
}

export default Help;
