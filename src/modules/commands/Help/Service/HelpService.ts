import Discord from "discord.js";
import * as FileHelper from "../../../io/FileHelper";

class HelpService {
    private helpMessage = FileHelper.readTextFileContent("assets/text/help/message.txt");

    /**
     * Sends a help message to a user. The help message is defined in:
     * "assets/text/help/message.txt"
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public sendHelpMessage(author: Discord.User): void {
        author.send(this.helpMessage);
    }
}

export default new HelpService;