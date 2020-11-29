import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';

import config, { selfAssignableRoles } from '../config';
import { db } from '../firebase';
import { getUserRoles } from './guild.service';
import { log } from '../logger';

/**
 * This command removes the role given in the argument to the user that executed the command, if that role can be
 * self-assigned.
 */
export const command = async (
  arg: [string, string],
  embed: MessageEmbed,
  message: Message
) => {
  const args = arg[1].toLowerCase().split(',');
  // Check if the user provided the role argument
  if (!args) {
    return buildErrorEmbed('Missing arguments');
  }

  const rolesToRemove = args.map((x) => x.trim());

  for (const roleToRemove of rolesToRemove) {
    // Check if the provided role is self-assignable
    if (selfAssignableRoles.find((role) => role === roleToRemove)) {
      const role = message.guild!.roles.cache.find(
        (r) => r.name === roleToRemove
      );
      if (!role) {
        log.error(`ERROR: Couldn't get the role: ${roleToRemove}`);
        return buildErrorEmbed();
      }
      // Remove the role from the user of the message
      // const member = message.member;
      await message.member!.roles.remove(role);
      await tryAddOpenSourceUserSubscription(roleToRemove, message);
    } else {
      return buildErrorEmbed(`The role you specified is not self-assignable, try one of these roles:
            ${selfAssignableRoles.join(', ')}
            `);
    }
  }

  // Save the user's role to the DB
  await db
    .collection('users')
    .doc(message.author.id)
    .set(
      {
        roles: await getUserRoles(message.member!),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

  const userName = message.member!.displayName || '';
  if (rolesToRemove.length > 1) {
    return embed.setDescription(
      `**${userName}** You now don't have the roles **${rolesToRemove.join(
        ', '
      )}**`
    );
  } else {
    return embed.setDescription(
      `**${userName}** You now don't have the **${rolesToRemove[0]}** role`
    );
  }

  // Auxiliar function
  function buildErrorEmbed(errorMsg = 'An error has occurred') {
    return embed
      .setTitle('Role Removal (error)')
      .setDescription(errorMsg)
      .addField('Usage', usage);
  }
};

export const description = 'Assign yourself a server role';

export const triggers = ['iamnot'];

export const usage = `${triggers[0]} <role name> || ${triggers[0]} <role name>, <role name>, ...`;

/**
 * Check if the role to assign is the open source role. If so, then add the open source subscription for the user to
 * receive recurrent messages to remind them to contribute to open source. If not then do nothing.
 * @param roleToRemove
 * @param message
 */
async function tryAddOpenSourceUserSubscription(
  roleToRemove: string,
  message: Message
) {
  if (roleToRemove === config.ROLE.OPEN_SOURCE.name) {
    // Get the subscriptions of the user that sent the given message
    // Add the open source subscription to the list of existing subscriptions
    await db
      .collection('usersSubscriptions') // TODO: create a constant variable with all these collection names (e.g. exported in firebase.ts)
      .doc(message.author.id)
      .delete(); // TODO: modify this, to remove ONLY the OpenSource Subscription.
  }
}
