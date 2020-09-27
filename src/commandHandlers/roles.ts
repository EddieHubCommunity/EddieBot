import { MessageEmbed } from 'discord.js';

import { getRoles } from './guild.service';
import config from '../config';

/**
 * This command lists the available roles on the discord server
 */
export const command = async (arg: string, embed: MessageEmbed) => {
    const roles = await getRoles();
    const rolesList = roles
        .filter(r => !r.name.includes('everyone')) // Filter the default role everyone has access to
        .map(discordRole =>  {
            const role = Object.values(config.ROLE).find(r => r.name === discordRole.name);
            const roleDescription = role ? `- ${role.description}` : '';

            return `\n• ${discordRole.toString()} ${roleDescription}`;
        });

    embed
        .setTitle('Available Roles')
        .setDescription(`Here is the list of roles on this server. You can assign almost any role to yourself. Some of the roles are admin only or given to you via a condition!
        ${rolesList}
        Example of usage:
        ^iam javascript`);

    return embed;
};

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0];
