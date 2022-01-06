import * as Discord from "discord.js";
import ReactService from "./Service/ReactService";
import AbstractCommand from "../../../models/AbstractCommand";

class React extends AbstractCommand {
    public name = "react";
    public description = "Allows you to use reaction images.";
    public usage = ["add <name>", "remove <name>", "<name>"];

    /**
     * Handles the execution of the "react" command and its sub-commands.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public execute(message: Discord.Message): void {
        super.execute(message);

        const commandParameters = super.getCommandParameters();

        switch (commandParameters[1]) {
            case "add":
                ReactService.addReaction(commandParameters[2], message);
                break;
            case "remove":
                ReactService.removeReaction(commandParameters[2], message);
                break;
            default:
                if (commandParameters[1]) {
                    ReactService.sendReaction(commandParameters[1], message);
                }
                break;
        }
    }
}

export default React;
