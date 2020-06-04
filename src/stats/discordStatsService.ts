import { StatsService } from "./statsService";
import { Client, TextChannel, Channel } from "discord.js";

/**
 * Uses the Discord API to implement the StatsService interface.
 */
export class DiscordStatsService implements StatsService {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * @returns the number of members in the server configured by the environment variables or 0 if there was an error
     */
    async getServerMemberCount(): Promise<number> {
        const guildKey = process.env.DISCORD_SERVER_ID;
        if (!guildKey) {
            console.error("ERROR: Couldn't get member count! Missing env. variable DISCORD_SERVER_ID. Please configure that value.");
            return 0;
        }
    
        const guild = this.client.guilds.cache.get(guildKey);
        if (!guild) {
            console.error("ERROR: Couldn't get member count! The guild with the configured DISCORD_SERVER_ID env. variable doesn't exist");
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
            const messagePromises = this.client.channels.cache
                .filter((ch: Channel) => ch instanceof TextChannel)
                .map((channel: TextChannel) => {
                    console.log(`Fetching messages for channel: ${channel.name}`)
                    return channel.messages.fetch()
                });
            
            const messageResponses = await Promise.all(messagePromises);
            return messageResponses.reduce((total, msgRsp) => total + msgRsp.size, 0);
        } catch(error) {
            console.error(`An error occurred while fetching messages`, error);
            return 0;
        }
    }

    async getServerTotalReactions(): Promise<number> {
        // TODO: implement this
        return 0;
    }
}