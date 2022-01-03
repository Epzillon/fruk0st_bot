import * as Discord from "discord.js";

import Logger from "../io/logger";
import CommandInterface from "../../models/CommandInterface";

import constants from "../constants";

class Music implements CommandInterface {
    public name = "music";
    public description = "Handles voice enabled music-playback.";
    public usage = [""];

    /**
     * Sends the list of available commands to the user who called the "help" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
        const parameters = commandStr.split(" ");

        switch (parameters[1]) {
            case "join":
                this.tryJoinChannel(message);
                break;
            case "disconnect":
                this.tryLeaveChannel(message);
                break;
            case "dc":
                this.tryLeaveChannel(message);
                break;
            case "leave":
                this.tryLeaveChannel(message);
                break;
            default:
                this.tryJoinChannel(message);
                break;
        }
    }

    private tryJoinChannel(message: Discord.Message) {
        const voiceChannel = message.member?.voice.channel;

        try {
            voiceChannel?.join();
        } catch (error) {
            Logger.error("Trying to connect to voice channel:\n" + error);
        }
    }

    private tryLeaveChannel(message: Discord.Message) {
        const voiceChannel = message.guild?.me?.voice.channel;

        try {
            voiceChannel?.leave();
        } catch (error) {
            Logger.error("Trying to leave voice channel:\n" + error);
        }
    }
}

export default Music;
