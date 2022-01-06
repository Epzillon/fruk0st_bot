import * as Discord from "discord.js";
import AbstractCommand from "../../../models/AbstractCommand";

class Poll extends AbstractCommand {
    public name = "poll";
    public description = "Allows you to manage polls.";
    public usage = ["create <?date> <time> <answers>", "delete <id>", "<id>"];

    /**
     * Handles the execution of the "poll" command and its sub-commands.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public execute(message: Discord.Message): void {
        super.execute(message);

        const commandParameters = super.getCommandParameters();

        switch (commandParameters[1]) {
            default:
                break;
        }
    }
}

export default Poll;
