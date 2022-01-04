import * as Discord from "discord.js";
import AbstractCommand from "../../../models/AbstractCommand";

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

        const author = message.author;

        author.send(
            "Hello, stranger! You can find the descriptions and usage instructions for commands here:\nhttps://github.com/EpiX0R/fruk0st_bot/blob/master/COMMANDS.md",
        );
    }
}

export default Help;
