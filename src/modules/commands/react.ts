import * as Discord from "discord.js";
import fs from "fs";

import { Command } from "../../models/commands";
import settings from "../../settings.json";

const reactImgFolder = "./assets/img/reaction/";

/**
 * Defines the exported command "react".
 */
const react: Command = {
    name: "react",
    description: "Sends the reaction image <name>.",
    parameters: ["name"],
    execute: executeReact,
};

/**
 * Handles the execution of the "react" command and its sub-commands.
 *
 * @param {Discord.Message} message The Discord message which called the command.
 */
function executeReact(message: Discord.Message): void {
    const parameters = message.content.split(" ");

    // Switch based on sub-command
    switch (parameters[1]) {
        case "add":
            addReaction(parameters[2], message);
            break;
        case "remove":
            removeReaction(parameters[2], message);
            break;
        default:
            sendReaction(parameters[1], message);
            break;
    }
}

/**
 * Sends a message with the reaction defined by name
 * to the channel where the command was called.
 *
 * @param {String} name The name of the reaction.
 * @param {Discord.Message} message The Discord message which called the command.
 */
function sendReaction(
    name: string,
    message: Discord.Message
): void {
    const author = message.author;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    let availableReactions = getReactionImages();
    let reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Sends the file if it was found, otherwise sends error message.
    if (reactionFilename !== undefined) {
        channel.send({files: [reactImgFolder + reactionFilename]});
    } else {
        channel.send(`${author}.\n\n:x: The reaction \`${name}\` does not exist. :x:`);
    }
}

/**
 * Saves the attached file as a new reaction with the given name. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 *  This function requires the user calling it to be in the .env ADMIN_LIST.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function addReaction(
    name: string,
    message: Discord.Message
): void {
    const admins = settings.admin_list;
    const author = message.author;
    const attachments = message.attachments;
    const channel = message.channel;

    if (admins.includes(author.id)) {
        channel.send(`:white_check_mark: Created reaction \`${name}\`! You can now use it with \`!react ${name}\`! :white_check_mark:`)
    } else {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`)
    }
}

/**
 * Removes the reaction with the given name from the bot. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 * This function requires the user calling it to be in the .env ADMIN_LIST.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function removeReaction(
    name: string,
    message: Discord.Message
): void {
    const admins = settings.admin_list;
    const author = message.author;
    const attachments = message.attachments;
    const channel = message.channel;

    if (admins.includes(author.id)) {
        channel.send(`:white_check_mark: Removed reaction \`${name}\`! :white_check_mark:`)
    } else {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`)
    }
}

function getReactionImages(): string[] {
    let files = fs.readdirSync(reactImgFolder);

    return files;
}

export default react;
