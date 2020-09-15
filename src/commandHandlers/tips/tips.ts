import { MessageEmbed } from 'discord.js';

import { createTip } from './opensource';

const AVAILABLE_SUBJECTS = ['opensource'];

/**
 * This command receives an argument that specifies the subject the user wants advice on, and then returns an embed
 * message with the tips and resources on that subject.
 */
export const command = async (arg: string, embed: MessageEmbed) => {
    const [subject] = arg.split('||');

    if (!subject) {
        return embed
            .setTitle('Tips (error)')
            .setDescription(description)
            .addField('ERROR', 'Missing arguments')
            .addField('Usage', usage)
    }

    switch (subject) {
        case 'opensource':
            return createTip(embed);
        default:
            return embed
                .setTitle('Tips')
                .setDescription('Sorry :frowning:, we don\'t have tips on that subject. Feel free to [open an issue](https://github.com/EddieJaoudeCommunity/EddieBot/issues) to add tips on that subject.')
    }
};


export const description = 'Get a list of tips and resources to help you on a given subject (e.g. open source)';

export const triggers = ['tips'];

export const usage = `${triggers[0]} <subject>. Available subjects: ${AVAILABLE_SUBJECTS.join(';')}`;
