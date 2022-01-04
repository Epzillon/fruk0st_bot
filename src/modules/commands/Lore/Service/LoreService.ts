import Discord from "discord.js";
import fs from "fs";
import * as FileHelper from "../../../io/FileHelper";
import LoreHelper from "../Helper/LoreHelper";
import Path from "path";
import settings from "../../../../settings.json";
import Logger from "../../../io/Logger";

/**
 * TODO: Feature multiple lore files through filename parameter
 */
class LoreService {
    private loreFolder = "./assets/text/lore/";
    private availableLores = FileHelper.getLoreTexts();
    private selectedLore: fs.PathLike = Path.basename(this.availableLores[0]);

    /**
     * Sends a message with the lore defined by name
     * to the channel where the command was issued.
     * 
     * TODO: Feature pagination and interactable command
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public sendLore(message: Discord.Message): void {
        const channel = message.channel;

        let text = FileHelper.readTextFile(this.loreFolder + this.selectedLore);

        try {
            channel.send("\`\`\`" + text + "\`\`\`");
        } catch (error) {
            Logger.error(`Failed trying to send lore from ${this.selectedLore}:\n` + error)   
        }
    }

    /**
     * Adds text to the lore defined by name.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
    public addLore(message: Discord.Message): void {
        let loreText = FileHelper.readTextFile(this.loreFolder + this.selectedLore);
        let newContent = message.content.split("#!lore add ")[1];

        loreText += newContent;
        loreText = LoreHelper.fixLoreEndFormatting(loreText);

        try {
            FileHelper.writeTextFile(this.loreFolder + this.selectedLore, loreText);
        } catch (error) {
            Logger.error('Failed trying to add lore to "' + this.selectedLore + '":\n' + error);
        }
    }

    /**
     * Adds text to the lore defined by name.
     *
     * @param {Discord.Message} message The Discord message which called the command.
     */
     public resetLore(message: Discord.Message): void {
        const admins = settings.admin_list;
        const author = message.author;
        const channel = message.channel;

        // Check if user is in the admin list in settings.json.
        if (!admins.includes(author.id)) {
            channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
            return;
        }

        try {
            FileHelper.writeTextFile(this.loreFolder + this.selectedLore, "");
            Logger.info(`Resetted the lore in "${this.selectedLore}."`);
            channel.send(`${author}.\n\n:white_check_mark: Resetted the lore in "${this.selectedLore}"! :white_check_mark:`);
        } catch (error) {
            Logger.error('Failed trying to reset the lore in "' + this.selectedLore + '"');
        }
    }
}

export default new LoreService;