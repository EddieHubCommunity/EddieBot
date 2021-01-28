import { MessageEmbed } from 'discord.js';

import { getRoles } from './guild.service';
import config, { selfAssignableRoles } from '../config';

/**
 * This command lists the available roles on the discord server
 */
export const command = async (arg: [string, string], embed: MessageEmbed) => {
  const roles = await getRoles();
  const specificRole = arg[1];
  const describedRoles: string[] = [];
  if (specificRole) {
    if (arg[1] === '-a' || arg[1] === 'all') {
      const rolesList = roles
        .filter((r) => !r.name.includes('everyone')) // Filter the default role everyone has access to
        .map((discordRole) => {
          const role = Object.values(config.ROLE).find(
            (r) => r.name === discordRole.name
          );
          const roleDescription = role ? `- ${role.description}` : '';
          if (roleDescription) {
            describedRoles.push(`
            ${discordRole.toString()} ${roleDescription}`);
            return undefined;
          } else {
            return ` ${discordRole.toString()}`;
          }
        }) // Filter the role names and generate list for roleDescriptions
        .filter((val) => val !== undefined); // Removed undefined values from the list
      embed.setTitle('Available Roles')
        .setDescription(`Here is the list of all the roles on this server. You can assign almost any role to yourself. Some of the roles are admin only or given to you via a condition!\n
        ${rolesList} \n${describedRoles.toString()}\n
        Example of usage:
        \`^iam add javascript\``);
      return embed;
    } else {
      // Search the roles list for the argument, and
      // if the role is not found, send an Error Embed
      const role = arg[1];
      const roleObject = roles.find((r) => r.name === role);
      if (roleObject) {
        const roleData = Object.values(config.ROLE).find(
          (r) => r.name === role
        );
        const roleDescription = roleData ? `- ${roleData.description}` : '';
        embed.setTitle(`${role} Role`)
          .setDescription(`${roleObject} ${roleDescription}
          \nAssigning this role to yourself:
              \`^iam add ${role}\``);
      } else {
        embed
          .setColor(config.COLORS.alerts)
          .setTitle('Role Listing (error)')
          .setDescription(`**${role}** \nThat role does not exist`)
          .addField('Usage', usage);
        console.log("ERROR- The queried role can't be found");
      }
      return embed;
    }
  } else {
    // Parse the Assignable-roles list and display assignable roles
    const describedRoles: string[] = [];
    const rolesList = roles
      .filter((r) => !r.name.includes('everyone')) // remove the common everyone role
      .filter((r) => selfAssignableRoles.includes(r.name)) // Filter the assignable roles
      .map((discordRole) => {
        const role = Object.values(config.ROLE).find(
          (r) => r.name === discordRole.name
        );
        const roleDescription = role ? `- ${role.description}` : '';
        if (roleDescription) {
          describedRoles.push(`
            ${discordRole.toString()} ${roleDescription}`);
          return undefined;
        } else {
          return ` ${discordRole.toString()}`;
        }
      })
      .filter((val) => val !== undefined);
    embed.setTitle('Assignable Roles')
      .setDescription(`Here is the list of all self-assignable roles on this server. You can assign the following roles to yourself:\n
      ${rolesList} \n${describedRoles.toString()}\n
      Assigning roles to yourself:
      \`^iam add javascript\``);
    return embed;
  }
};

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0] + ' <argument>';
