import * as Discord from "discord.js";

import CommandInterface from "../../models/CommandInterface";

class Help implements CommandInterface {
    public name = "help";
    public description = "Sends this message in DM's";
    public usage = [""];

    /**
     * Sends the list of available commands to the user who called the "help" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        const author = message.author;

        // Send the help text to user who called "help" in DM.
        author.send(
            "Hello, stranger! You can find the descriptions and usage instructions for commands here:\nhttps://github.com/EpiX0R/fruk0st_bot/blob/master/COMMANDS.md",
        );
    }
}

export default Help;