import { MessageEmbed, Role, Collection } from 'discord.js';

import { getRoles } from './guild.service';
import config, { selfAssignableRoles } from '../config';

/**
 * This command lists the available roles on the discord server
 */
export const command = async (arg: [string, string], embed: MessageEmbed) => {
  const roles = await getRoles();
  const specificRole = arg[1];

  if (specificRole) {
    if (specificRole === '-a' || specificRole === 'all') {
      const [rolesList, describedRoles] = getRoleLists(roles, (r) =>
        r.name.includes('everyone')
      );
      embed.setTitle('Available Roles')
        .setDescription(`Here is the list of all the roles on this server. You can assign almost any role to yourself. Some of the roles are admin only or given to you via a condition!\n
        ${rolesList.toString()}
        ${describedRoles.toString()}\n
        Assigning this role to yourself:
        \`^iam add javascript\``);
    } else {
      // Search the roles list for the argument, and
      // if the role is not found, send an Error Embed
      const [rolesList, describedRoles] = getRoleLists(
        roles,
        (r) => !r.name.includes(specificRole)
      );
      if (rolesList.length === 0 && describedRoles.length == 0) {
        embed
          .setColor(config.COLORS.alerts)
          .setTitle('Role Listing (error)')
          .setDescription(`**${specificRole}** \nThat role does not exist`)
          .addField('Usage', usage);
        console.log("ERROR- The queried role can't be found");
      } else {
        embed.setTitle(`${specificRole} Role`)
          .setDescription(`${rolesList.concat(describedRoles).toString()}
          \nAssigning this role to yourself:
          \`^iam add ${specificRole}\``);
      }
    }
  } else {
    const roleInfo = getRoleLists(
      roles,
      (r) => !selfAssignableRoles.includes(r.name)
    );
    embed.setTitle('Assignable Roles')
      .setDescription(`Here is the list of all self-assignable roles on this server. You can assign the following roles to yourself:\n
      ${roleInfo[0].toString()}
      ${roleInfo[1].toString()}\n
      Assigning roles to yourself:
      \`^iam add javascript\``);
  }
  return embed;
};

// Returns two lists, one with all the role names and the other with role names followed by their description.
function getRoleLists(
  roles: Collection<string, Role>,
  notValid: (role: Role) => boolean
): [string[], string[]] {
  const describedRoles: string[] = [];
  const rolesList: string[] = [];
  roles.forEach((role) => {
    if (notValid(role)) {
      return;
    }
    const roleConfig = Object.values(config.ROLE).find(
      (r) => r.name === role.name
    );
    if (roleConfig && roleConfig.description) {
      describedRoles.push(`\n${role.toString()} - ${roleConfig.description}`);
    } else {
      rolesList.push(` ${role.toString()}`);
    }
  });
  return [rolesList, describedRoles];
}

export const description = 'Server roles';

export const triggers = ['roles'];

export const usage = triggers[0] + ' <>';
