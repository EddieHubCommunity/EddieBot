import { Role, Collection, GuildMember, Guild } from 'discord.js';

import { client as discordClient } from '../client';
import { log } from '../logger';

export async function getRoles(): Promise<Collection<string, Role>> {
    const guild = getConfiguredGuild()
    if (!guild) {
        log.error('ERROR: Couldn\'t get roles list! The guild with the configured DISCORD_SERVER_ID env. variable doesn\'t exist');
        return new Collection();
    }

    return guild.roles.cache;
}

export async function getUserRoles(member: GuildMember): Promise<string[]> {
    const allRoles = await getRoles();

    return allRoles
        .filter(role => !role.name.includes('everyone'))
        .filter((role) => member.roles.cache.has(role.id))
        .map((role) => role.name);
}

export function getConfiguredGuild(): Guild | undefined {
    const guildKey = process.env.DISCORD_SERVER_ID;
    if (!guildKey) {
        log.error('ERROR: Couldn\'t get roles list! Missing env. variable DISCORD_SERVER_ID. Please configure that value.');
        return;
    }

    return discordClient.guilds.cache.get(guildKey);
}
