import CommandInterface from "models/CommandInterface";

import Help from "modules/commands/Help";
import React from "modules/commands/React";
import Poll from "modules/commands/Poll";
import Lore from "modules/commands/Lore";
import Music from "modules/commands/Music";

let HelpCommand = new Help();
let ReactCommand = new React();
let PollCommand = new Poll();
let LoreCommand = new Lore();
let MusicCommand = new Music();

const commands: CommandInterface[] = [
    HelpCommand,
    ReactCommand,
    PollCommand,
    LoreCommand,
    MusicCommand
];

export default commands;
