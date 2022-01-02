import * as Discord from "discord.js";
import fs from "fs";
import https from "https";

const reactImgFolder = "./assets/img/reaction/";
const loreFolder = "./assets/text/lore/";

/**
 * Saves all the files contained within a Discord attachment collection.
 *
 * @param {fs.PathLike} destination The destination of the files to be saved.
 * @param {Discord.Collection<Discord.Snowflake, Discord.MessageAttachment>} attachments The Discord collection containing the attachments to be saved.
 */
export function saveDiscordMessageAttachments(
    name: string,
    destination: fs.PathLike,
    attachments: Discord.Collection<Discord.Snowflake, Discord.MessageAttachment>,
): void {
    const attachmentArray = attachments.array();

    attachmentArray.forEach((attachment) => {
        const url = attachment.url;
        const extension = attachment.url.split(".").pop();

        // Download the attached file.
        https.get(url, function (response) {
            response.pipe(
                // Write to destination.
                fs.createWriteStream(destination + name + "." + extension, {
                    autoClose: true,
                }),
            );
        });
    });
}

/**
 * Retrieves all filenames from the reaction image folder.
 *
 * @returns {string[]} The filenames as strings in an array.
 */
export function getReactionImages(): string[] {
    const files = fs.readdirSync(reactImgFolder);

    return files;
}

/**
 * Retrieves all filenames from the lore folder.
 *
 * @returns {string[]} The filenames as strings in an array.
 */
export function getLoreTexts(): string[] {
    const files = fs.readdirSync(loreFolder);

    return files;
}

/**
 * Reads text from a file and returns it.
 *
 * @returns {string} The content of the file.
 */
export function readTextFile(filename: string): string {
    let content = fs.readFileSync(filename, "utf-8");

    return content;
}

/**
 * Overwrites a files content with new data in UTF-8 format.
 *
 * @returns {void}
 */
export function writeTextFile(filename: string, data: string): void {
    fs.writeFile(filename, data, function(err) {
        if (err) console.log(err);
    });
}
