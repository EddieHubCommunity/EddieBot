import { MessageEmbed } from 'discord.js';

import { getOpenSourceResources, getOpenSourceTips } from './opensource.service';

/**
 * This command shows a curated list of tips and resources that help members of the community to contribute to
 * open-source software (OSS).
 */
export const command = async (arg: string, embed: MessageEmbed) => {
    const tips = await getOpenSourceTips();
    const resources = await getOpenSourceResources();
    embed
        .setTitle('Open source Tips and Resources')
        .addField('Tips :bulb:', tips)
        .addField('Links and Resources :link:', resources)
        .addField('Help us with this list :heart:', 'If you want to contribute to this list, feel free to [open an issue](https://github.com/EddieJaoudeCommunity/EddieBot/issues). Label it with "command: opensource" so we can easily find your tips and links :slight_smile:');

    return embed;
};

export const description = 'Open source tips and resources to help you contribute to OSS.';

export const triggers = ['oss', 'opensource', 'openSource'];

export const usage = triggers[0];
