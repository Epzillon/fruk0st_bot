import * as Discord from "discord.js";
import constants from "../../constants";
import AbstractCommand from "../../../models/AbstractCommand";
import LoreService from "./Service/LoreService";

class Lore extends AbstractCommand {
    public name = "lore";
    public description = "Handles commands related to the server lore.";
    public usage = [""];

    /**
     * Sends the list of available commands to the user who called the "lore" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        super.execute(message);

        const commandParameters = super.getCommandParameters();

        switch (commandParameters[1]) {
            case "add":
                LoreService.addLore(message);
                break;
            case "reset":
                LoreService.resetLore(message);
                break;
            default:
                LoreService.sendLore(message);
                break;
        }
    }
}

export default Lore;
