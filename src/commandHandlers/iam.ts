import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';

import config, { selfAssignableRoles, UserSubscriptions } from '../config';
import { db } from '../firebase';
import { getUserRoles } from './guild.service';
import { log } from '../logger';

/**
 * This command assigns or removes the role given in the argumens
 * to the user that executed the command,
 * if that role is self-assignable
 */
export const command = async (
  arg: [string, string],
  embed: MessageEmbed,
  message: Message
) => {
  // Check for add or remove keywords
  const argCheck = arg[1].toLowerCase().split(' ');
  let toAdd;

  if (argCheck[0] === 'add') {
    toAdd = true;
  } else if (argCheck[0] === 'remove') {
    toAdd = false;
  } else {
    return buildErrorEmbed('Missing arguments');
  }

  // get list of roles to modify
  argCheck.shift();
  const args = argCheck.join(' ').split(',');

  // Check if the user provided the role argument
  if (!args) {
    return buildErrorEmbed('Missing arguments');
  }

  const rolesToModify = args.map((x) => x.trim());

  for (const roleToModify of rolesToModify) {
    // Check if the provided role is self-assignable
    if (selfAssignableRoles.find((role) => role === roleToModify)) {
      const role = message.guild!.roles.cache.find(
        (r) => r.name === roleToModify
      );
      if (!role) {
        log.error(`ERROR: Couldn't get the role: ${roleToModify}`);
        return buildErrorEmbed();
      }

      const member = message.member;
      if (toAdd) {
        // Checks if the user already has the role
        if (member!.roles.cache.find((r) => r.name === roleToModify)) {
          return buildErrorEmbed(`You already have the ${roleToModify} role`);
        } else {
          // Adds role to author of the message
          await member!.roles.add(role);
        }
      } else {
        // Unassign role from author of the message
        if (member!.roles.cache.find((r) => r.name === roleToModify)) {
          await member!.roles.remove(role);
        } else {
          // Checks if the user does not have the role
          return buildErrorEmbed(`You do not have the role: ${roleToModify}`);
        }
      }
    } else {
      return buildErrorEmbed(`The role you specified is not self-assignable, try one of these roles:
            ${selfAssignableRoles.join(', ')}
            `);
    }

    // Checks if role being assigned is Opensource role
    if (roleToModify === config.ROLE.OPEN_SOURCE.name) {
      // Check if subscription is to be added or removed and calls respective function
      if (toAdd) {
        await addOpenSourceUserSubscription(roleToModify, message);
      } else {
        await removeOpenSourceUserSubscription(roleToModify, message);
      }
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
  if (rolesToModify.length > 1) {
    if (toAdd) {
      return embed.setDescription(
        `**${userName}** You now have the roles **${rolesToModify.join(', ')}**`
      );
    } else {
      return embed.setDescription(
        `**${userName}** You now don't have the roles **${rolesToModify.join(
          ', '
        )}**`
      );
    }
  } else {
    if (toAdd) {
      return embed.setDescription(
        `**${userName}** You now have the **${rolesToModify[0]}** role`
      );
    } else {
      return embed.setDescription(
        `**${userName}** You now don't have the **${rolesToModify[0]}** role`
      );
    }
  }

  // Auxiliar function
  function buildErrorEmbed(errorMsg = 'An error has occurred') {
    return embed
      .setColor(config.COLORS.alerts)
      .setTitle('Role Assignment (error)')
      .setDescription(errorMsg)
      .addField('Usage', usage);
  }
};

export const description =
  'Assign yourself a server role or unassign your server role';

export const triggers = ['iam'];

export const usage =
  '`' +
  `${triggers[0]} <add/remove> <role name>` +
  '` or `' +
  `${triggers[0]} <add/remove> <role name>, <role name>, ...` +
  '`';

/**
 * Adds the open source subscription for the user to
 * receive recurrent messages to remind them to contribute to open source.
 * @param roleToAssign
 * @param message
 */
async function addOpenSourceUserSubscription(
  roleToModify: string,
  message: Message
) {
  // Get the subscriptions of the user that sent the given message
  const doc = await db
    .collection('usersSubscriptions')
    .doc(message.author.id)
    .get();
  const data = doc.data();
  const subscriptions: string[] = data != null ? data.subscriptions : [];

  // Add the open source subscription to the list of existing subscriptions
  await db
    .collection('usersSubscriptions') // TODO: create a constant variable with all these collection names (e.g. exported in firebase.ts)
    .doc(message.author.id)
    .set(
      {
        subscriptions: [...subscriptions, UserSubscriptions.OPEN_SOURCE],
        username: message.author.username,
      },
      { merge: true }
    );
}

/**
 * Removes the open source subscription for the user to
 * stop recieving recurrent messages to remind them to contribute to open source.
 * @param roleToAssign
 * @param message
 *
 ! NOTE- This function has to be modified, so that it 
 ! only deletes the user's OpenSourceSubscription
 */
async function removeOpenSourceUserSubscription(
  roleToModify: string,
  message: Message
) {
  // Deletes the opensource subscription for the user
  await db.collection('userSubscription').doc(message.author.id).delete(); // TODO: set this to only delete the opensource subscription, not the entire subscriptions field of the user
}
