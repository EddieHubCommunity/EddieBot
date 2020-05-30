import { StatsService } from "./statsService";
import { Client } from "discord.js";

/**
 * Uses the Discord API to implement the StatsService interface.
 */
export class DiscordStatsService implements StatsService {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * @returns the number of members in the server configured by the environment variables or null if there was an error
     */
    async getServerMemberCount(): Promise<number> {
        const guildKey = process.env.DISCORD_SERVER_ID;
        if (!guildKey) {
            console.error(`ERROR: Couldn't get member count! Missing env. variable DISCORD_SERVER_ID. Please configure that value.`);
            return 0;
        }
    
        const guild = this.client.guilds.cache.get(guildKey);
        if (!guild) {
            console.error(`ERROR: Couldn't get member count! The guild with the configured DISCORD_SERVER_ID env. variable doesn't exist`);
            return 0;
        }
    
        return guild.memberCount;
    }

    async getServerTotalMessages(): Promise<number> {
        // TODO: implement this
        return 0;
    }

    async getServerTotalReactions(): Promise<number> {
        // TODO: implement this
        return 0;
    }
}