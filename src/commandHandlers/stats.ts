import { MessageEmbed } from 'discord.js';

import { statsService } from './stats.service';

export const command = async (arg: string, embed: MessageEmbed) => {

    const memberCount = await statsService.getServerMemberCount();
    const totalMessages = await statsService.getServerTotalMessages();
    embed
        .setTitle('Server stats')
        .addField('total users', memberCount)
        .addField('total messages', totalMessages)

    return embed;
};

export const description = 'Server status';

export const triggers = ['stats'];

export const usage = triggers[0];
