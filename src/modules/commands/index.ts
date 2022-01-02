import CommandInterface from "../../models/CommandInterface";

import Help from "./Help";
import React from "./React";
import Poll from "./Poll";
import Lore from "./Lore";

let HelpCommand = new Help();
let ReactCommand = new React();
let PollCommand = new Poll();
let LoreCommand = new Lore();

const commands: CommandInterface[] = [
    HelpCommand,
    ReactCommand,
    PollCommand,
    LoreCommand
];

export default commands;
