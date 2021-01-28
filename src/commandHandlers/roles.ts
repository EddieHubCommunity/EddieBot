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
      const describedRoles: string[] = [];
      const rolesList: string[] = [];
      roles.forEach((role) => {
        if (role.name.includes('everyone')) {
          return;
        }
        const roleConfig = Object.values(config.ROLE).find(
          (r) => r.name === role.name
        );
        if (roleConfig && roleConfig.description) {
          describedRoles.push(`${role.toString()} - ${roleConfig.description}
          `);
        } else {
          rolesList.push(` ${role.toString()}`);
        }
      });
      embed.setTitle('Available Roles')
        .setDescription(`Here is the list of all the roles on this server. You can assign almost any role to yourself. Some of the roles are admin only or given to you via a condition!\n
        ${rolesList.toString()}\n
        ${describedRoles.toString()}
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
          .setDescription(`\n${roleObject} ${roleDescription}
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
    const rolesList: string[] = [];
    roles.forEach((role) => {
      if (!selfAssignableRoles.includes(role.name)) {
        return;
      }
      const roleConfig = Object.values(config.ROLE).find(
        (r) => r.name === role.name
      );
      if (roleConfig && roleConfig.description) {
        describedRoles.push(`${role.toString()} - ${roleConfig.description}\n`);
      } else {
        rolesList.push(` ${role.toString()}`);
      }
    });
    embed.setTitle('Assignable Roles')
      .setDescription(`Here is the list of all self-assignable roles on this server. You can assign the following roles to yourself:\n
      ${rolesList}\n
      ${describedRoles.toString()}
      Assigning roles to yourself:
      \`^iam add javascript\``);
    return embed;
  }
};

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0] + ' <argument>';
