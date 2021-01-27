import { MessageEmbed } from 'discord.js';

import { getRoles } from './guild.service';
import config, { selfAssignableRoles } from '../config';

/**
 * This command lists the available roles on the discord server
 */
export const command = async (arg: [string, string], embed: MessageEmbed) => {
  const roles = await getRoles();
  const specificRole = arg[1];
  if (specificRole) {
    if (arg[1] === '-a' || arg[1] === 'all') {
      const rolesList = roles
        .filter((r) => !r.name.includes('everyone')) // Filter the default role everyone has access to
        .map((discordRole) => {
          const role = Object.values(config.ROLE).find(
            (r) => r.name === discordRole.name
          );
          const roleDescription = role ? `- ${role.description}` : '';

          return `${discordRole.toString()} ${roleDescription}`;
        });
      embed.setTitle('Available Roles')
        .setDescription(`Here is the list of all the roles on this server. You can assign almost any role to yourself. Some of the roles are admin only or given to you via a condition!
        ${rolesList}
        Example of usage:
        \`^iam add javascript\``);
      return embed;
    } else {
      // Parse the roles list for the argument, and set up a try except,
      // if anything errors out send an Error Embed
      console.log('details about the role');
      return embed;
    }
  } else {
    console.log('weeeee');
    return embed;
    // Parse the Assignable-roles list for the argument, and set up a try except,
    // if anything errors out send an Error Embed
  }
};

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0];
