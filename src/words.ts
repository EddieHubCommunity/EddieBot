import { Message } from 'discord.js';

import config from './config';

const { defaultEmbed, WORDS } = config;

/**
 * Runs for every message
 * and checks for not recommended words
 * and replies with suggestions
 *
 * @param message
 */
export const words = async (message: Message) => {
    if (message.author.bot) {
        return;
    }

    const match = WORDS.checks
        .find((word) => WORDS.prepend
            .find((prepend) => {
                const msg = message.content.toLowerCase();
                return msg.includes(`${prepend} ${word.check} `) || msg.includes(`${word.check}.`)}));
    if (match) {
        const embed = defaultEmbed()
            .setTitle(`You used the word "${match.check.toUpperCase()}"`)
            .setDescription('In future, please use one of the following suggestions instead...');

        match.suggestions.forEach((suggestion) => embed.addField(suggestion, 'Is another alternative'));

        return message.channel.send(embed);
    }

    return;
};
