import * as Discord from "discord.js";
import fs from "fs";
import * as io from "../io";
import Path from "path";

import CommandInterface from "../../models/CommandInterface";
import settings from "../../settings.json";

import constants from "../constants";

class Lore implements CommandInterface {
    public name = "lore";
    public description = "Handles commands related to the server lore.";
    public usage = [""];

    private loreFolder = "./assets/text/lore/";

    /**
     * Sends the list of available commands to the user who called the "lore" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
        const parameters = commandStr.split(" ");

        // Switch based on sub-command
        switch (parameters[1]) {
            case "add":
                this.addLore(message);
                break;
            case "reset":
                this.resetLore(message);
                break;
            default:
                this.sendLore(message);
                break;
        }
    }

    /**
     * Handler for "lore".
     *
     * Sends a message with the lore defined by name
     * to the channel where the command was issued.
     * 
     * TODO: Feature multiple lore files through filename parameter
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    private sendLore(message: Discord.Message): void {
        const author = message.author;
        const channel = message.channel;

        // Retrieves all filenames in lore text folder and finds the file specified.
        const availableLores = io.getLoreTexts();
        let loreFilename = availableLores[0];

        // Assure filename is safe and not PathLike
        if (loreFilename) {
            loreFilename = Path.basename(loreFilename);
        }

        // Sends the file if it was found, otherwise sends error message.
        if (loreFilename !== undefined) {
            let text = io.readTextFile(this.loreFolder + loreFilename);
            if (text.length > 0) {
                channel.send("\`\`\`" + text + "\`\`\`");
            } else {
                channel.send(`${author}.\n\n:x: ${loreFilename} is empty! :x:`);
            }
        } else {
            channel.send(`${author}.\n\n:x: This lore does not exist. :x:`);
        }
    }

    /**
     * Handler for "lore add".
     *
     * Adds text to the lore defined by name.
     * 
     * TODO: Feature multiple lore files through filename parameter
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    private addLore(message: Discord.Message): void {
        const author = message.author;
        const channel = message.channel;

        // Retrieves all filenames in lore text folder and finds the file specified.
        const availableLores = io.getLoreTexts();
        let loreFilename = availableLores[0];

        // Assure filename is safe and not PathLike
        if (loreFilename) {
            loreFilename = Path.basename(loreFilename);
        }

        // Sends the file if it was found, otherwise sends error message.
        if (loreFilename !== undefined) {
            let text = io.readTextFile(this.loreFolder + loreFilename);
            
            // Fix invalid formatting
            if (text.length > 0 && text.slice(-1) === ".") {
                text += " ";
            } else if (text.length > 0) {
                text += ". ";
            }

            // Add everything after "#!lore add " to lore textfile
            text += message.content.split("#!lore add ")[1]

            io.writeTextFile(this.loreFolder + loreFilename, text);
            channel.send(`${author}.\n\n:white_check_mark: Added lore to ${loreFilename}! :white_check_mark:`);
        } else {
            channel.send(`${author}.\n\n:x: Something went wrong. :x:`);
        }
    }

    /**
     * Handler for "lore reset".
     *
     * Adds text to the lore defined by name.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    private resetLore(message: Discord.Message): void {
        const admins = settings.admin_list;
        const author = message.author;
        const channel = message.channel;

        // Check if user is in the admin list in settings.json.
        if (!admins.includes(author.id)) {
            channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
            return;
        }

        // Retrieves all filenames in lore text folder and finds the file specified.
        const availableLores = io.getLoreTexts();
        let loreFilename = availableLores[0];

        // Assure filename is safe and not PathLike
        if (loreFilename) {
            loreFilename = Path.basename(loreFilename);
        }

        // Sends the file if it was found, otherwise sends error message.
        if (loreFilename !== undefined) {
            io.writeTextFile(this.loreFolder + loreFilename, "");
            channel.send(`${author}.\n\n:white_check_mark: Resetted the lore in ${loreFilename}! :white_check_mark:`);
        } else {
            channel.send(`${author}.\n\n:x: Something went wrong. :x:`);
        }
    }
}

export default Lore;
