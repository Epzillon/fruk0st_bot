import * as Discord from "discord.js";
import constants from "constants";
import MusicService from "modules/commands/Music/Service/MusicService"
import AbstractCommand from "models/AbstractCommand";

class Music extends AbstractCommand {
    public name = "music";
    public description = "Handles voice enabled music-playback.";
    public usage = [""];

    /**
     * Sends the list of available commands to the user who called the "help" command.
     *
     * @param {Discord.Message} message The Discord message which called upon the command.
     */
    public execute(message: Discord.Message): void {
        super.execute(message);

        const commandParameters = super.getCommandParameters();

        switch (commandParameters[1]) {
            case "play":
                MusicService.tryPlayMusic(message);
                break;
            case "join":
                MusicService.tryJoinChannel(message);
                break;
            case "leave":
                MusicService.tryLeaveChannel(message);
                break;
            default:
                break;
        }
    }
}

export default Music;
