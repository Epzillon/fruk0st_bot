import CommandInterface from "../../models/CommandInterface";

import Help from "./help";
import React from "./react";
import Poll from "./poll";
import Lore from "./lore";
import Music from "./music";

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
