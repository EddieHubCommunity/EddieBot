import { MessageEmbed } from 'discord.js';

import { client } from '../client';
import { StatsService } from './stats.service';

export const command = async (embed: MessageEmbed) => {
    const statsService = new StatsService(client)

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
