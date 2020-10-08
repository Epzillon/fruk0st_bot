import * as Discord from "discord.js";
import fs from "fs";
import * as io from "../io";

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
 * Handler for "react [name]".
 *
 * Sends a message with the reaction defined by name
 * to the channel where the command was called.
 *
 * @param {String} name The name of the reaction.
 * @param {Discord.Message} message The Discord message which called the command.
 */
function sendReaction(name: string, message: Discord.Message): void {
    const author = message.author;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    const availableReactions = getReactionImages();
    const reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Sends the file if it was found, otherwise sends error message.
    if (reactionFilename !== undefined) {
        channel.send({ files: [reactImgFolder + reactionFilename] });
    } else {
        channel.send(`${author}.\n\n:x: The reaction \`${name}\` does not exist. :x:`);
    }
}

/**
 * Handler for "react add [name]".
 *
 * Saves the attached file as a new reaction with the given name. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 *  This function requires the user calling it to be in the .env ADMIN_LIST.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function addReaction(name: string, message: Discord.Message): void {
    const admins = settings.admin_list;
    const author = message.author;
    const attachments = message.attachments;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    const availableReactions = getReactionImages();
    const reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Check if user is in the admin list in settings.json.
    if (admins.includes(author.id)) {
        // Creates the file if it was not found, otherwise sends error message.
        if (reactionFilename === undefined) {
            io.saveDiscordMessageAttachments(name, reactImgFolder, attachments);

            channel.send(
                `:white_check_mark: Created reaction \`${name}\`! You can now use it with \`!react ${name}\`! :white_check_mark:`,
            );
        } else {
            channel.send(
                `${author}.\n\n:x: The reaction \`${name}\` already exists. Please use another name or remove the current reaction first. :x:`,
            );
        }
    } else {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
    }
}

/**
 * Handler for "react remove [name]".
 *
 * Removes the reaction with the given name from the bot. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 * This function requires the user calling it to be in the .env ADMIN_LIST.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function removeReaction(name: string, message: Discord.Message): void {
    const admins = settings.admin_list;
    const author = message.author;
    const attachments = message.attachments;
    const channel = message.channel;

    if (admins.includes(author.id)) {
        channel.send(`:white_check_mark: Removed reaction \`${name}\`! :white_check_mark:`);
    } else {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
    }
}

function getReactionImages(): string[] {
    const files = fs.readdirSync(reactImgFolder);

    return files;
}

export default react;
