import { Client, TextChannel, Channel } from 'discord.js';

import { client } from '../client';
import { log } from '../logger';

export interface StatsServiceInterface {
    getServerMemberCount(): Promise<number>;
    getServerTotalMessages(): Promise<number>;
    getServerTotalReactions(): Promise<number>;
}

/**
 * Uses the Discord API to implement the StatsService interface.
 */
class StatsService implements StatsServiceInterface {

    constructor(private discordClient: Client) {}

    /**
     * @returns the number of members in the server configured by the environment variables or 0 if there was an error
     */
    async getServerMemberCount(): Promise<number> {
        const guildKey = process.env.DISCORD_SERVER_ID;
        if (!guildKey) {
            log.error('ERROR: Couldn\'t get member count! Missing env. variable DISCORD_SERVER_ID. Please configure that value.');
            return 0;
        }

        const guild = this.discordClient.guilds.cache.get(guildKey);
        if (!guild) {
            log.error('ERROR: Couldn\'t get member count! The guild with the configured DISCORD_SERVER_ID env. variable doesn\'t exist');
            return 0;
        }

        return guild.memberCount;
    }

    /**
     * Fetch the messages from the channels that exist on the discord server.
     * Note: This method doesn't count messages from deleted channels.
     * @returns the total number of messages in the discord server or 0 if there was an error
     */
    async getServerTotalMessages(): Promise<number> {
        try {
            // Fetch in parallel the messages from all text channels
            const messagePromises = this.discordClient.channels.cache
                .filter((ch: Channel) => ch instanceof TextChannel)
                .map((channel: TextChannel) => channel.messages.fetch());

            const messageResponses = await Promise.all(messagePromises);
            return messageResponses.reduce((total, msgRsp) => total + msgRsp.size, 0);
        } catch (error) {
            log.error(`An error occurred while fetching messages`, error);
            return 0;
        }
    }

    async getServerTotalReactions(): Promise<number> {
        // TODO: implement this
        log.info('Get server total reactions not implemented yet');
        return 0;
    }
}

export const statsService = new StatsService(client);
