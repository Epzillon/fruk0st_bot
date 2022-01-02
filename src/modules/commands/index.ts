import { Command } from "../../models/commands";

import help from "./help";
import react from "./react";
import poll from "./poll";
import lore from "./lore";

const commands: Command[] = [help, react, poll, lore];

export default commands;
