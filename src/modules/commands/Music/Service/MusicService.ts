import Discord from "discord.js";
import Logger from "modules/io/Logger";

class MusicService {
    public tryJoinChannel(message: Discord.Message) {
        const voiceChannel = message.member?.voice.channel;

        try {
            voiceChannel?.join();
        } catch (error) {
            Logger.error("Trying to connect to voice channel:\n" + error);
        }
    }

    public tryLeaveChannel(message: Discord.Message) {
        const voiceChannel = message.guild?.me?.voice.channel;

        try {
            voiceChannel?.leave();
        } catch (error) {
            Logger.error("Trying to leave voice channel:\n" + error);
        }
    }

    public tryPlayMusic(message: Discord.Message){
        this.tryJoinChannel(message);

        // find url in message
        // attempt to connect to source
        // attempt to play sound
    }
}

export default new MusicService;