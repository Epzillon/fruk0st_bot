class LoreHelper {
    /**
     * Checks if a string with lore text has an invalid ending and if so fixes it.
     *
     * @param {String} unvalidatedLoreText The lore text which has not been checked;
     * @returns {String} The lore text with proper ending.
     */
    public fixLoreEndFormatting(unvalidatedLoreText: string) {
        let loreText = unvalidatedLoreText;

        if (loreText.length > 0 && loreText.slice(-1) === ".") {
            loreText += " ";
        } else if (loreText.length > 0) {
            loreText += ". ";
        }

        return loreText;
    }
}

export default new LoreHelper;