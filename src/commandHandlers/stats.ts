import { Client, MessageEmbed } from 'discord.js';

import { StatsService } from './stats.service';

export const command = async (arg: string, client: Client, embed: MessageEmbed) => {
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
