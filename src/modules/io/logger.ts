import fs from "fs";
import chalk from "chalk";
import dayjs from "dayjs";

class Logger {
    private logFile: fs.WriteStream;

    constructor() {
        this.logFile = fs.createWriteStream("./log/log.txt", {
            flags: "a",
            autoClose: true,
        });
    }

    private getFormattedDate(): string {
        return dayjs().format();
    }

    public success(message: string) {
        let formattedMessage = this.getFormattedDate() + " SUCCESS:\t" + message;

        this.logFile.write(formattedMessage + "\n");
        console.log(chalk.green(formattedMessage));
    }

    public info(message: string) {
        let formattedMessage = this.getFormattedDate() + " INFO:\t\t" + message;

        this.logFile.write(formattedMessage + "\n");
        console.log(chalk.white(formattedMessage));
    }

    public warning(message: string) {
        let formattedMessage = this.getFormattedDate() + " WARNING:\t" + message;

        this.logFile.write(formattedMessage + "\n");
        console.log(chalk.yellow(formattedMessage));
    }

    public error(message: string) {
        let formattedMessage = this.getFormattedDate() + " ERROR:\t" + message;

        this.logFile.write(formattedMessage + "\n");
        console.log(chalk.red(formattedMessage));
    }
}

export default new Logger;
