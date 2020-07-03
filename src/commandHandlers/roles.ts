import { MessageEmbed } from 'discord.js';

import { getRoles } from './guild.service';

/**
 * This command lists the available roles on the discord server
 */
export const command = async (arg: string, embed: MessageEmbed) => {
    const roles = await getRoles();
    const rolesList = roles
        .filter(r => !r.name.includes('everyone')) // Filter the default role everyone has access to
        .map(role => `\n• ${role.toString()}`);

    embed
        .setTitle('Available Roles')
        .setDescription(`Here is the list of roles on this server. You can assign any role to yourself, except the ones for admins or given to you via a condition!
        ${rolesList}`);

    return embed;
};

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0];
