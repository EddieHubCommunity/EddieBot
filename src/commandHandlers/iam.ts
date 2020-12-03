import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';

import config, { selfAssignableRoles, UserSubscriptions } from '../config';
import { db } from '../firebase';
import { getUserRoles } from './guild.service';
import { log } from '../logger';

/**
 * This command assigns the role given in the argument to the user that executed the command, if that role can be
 * self-assigned.
 */
export const command = async (
  arg: [string, string],
  embed: MessageEmbed,
  message: Message
) => {
  const argCheck = arg[1].toLowerCase().split(' ');
  let toAdd;
  if (argCheck[0] === 'add') {
    toAdd = true;
  } else if (argCheck[0] === 'remove') {
    toAdd = false;
  } else {
    return buildErrorEmbed('Missing arguments');
  }
  // const toAdd = argCheck[0] === 'add' ? true : false;
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
      // Assign the role to the user of the message
      const member = message.member;
      if (toAdd) {
        await member!.roles.add(role);
      } else {
        if (member!.roles.cache.find((r) => r.name === roleToModify)) {
          await member!.roles.remove(role);
        } else {
          log.error(`ERROR: You do not have the role: ${roleToModify}`);
          return buildErrorEmbed();
        }
      }
      await tryAddOpenSourceUserSubscription(roleToModify, toAdd, message);
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
        `**${userName}** You now don't have **${rolesToModify[0]}** the role`
      );
    }
  }

  // Auxiliar function
  function buildErrorEmbed(errorMsg = 'An error has occurred') {
    return embed
      .setTitle('Role Assignment (error)')
      .setDescription(errorMsg)
      .addField('Usage', usage);
  }
};

export const description = 'Assign yourself a server role';

export const triggers = ['iam'];

export const usage = `${triggers[0]} <role name> || ${triggers[0]} <role name>, <role name>, ...`;

/**
 * Check if the role to assign or remove  is the open source role. If so, then add or remove the open source subscription for the user to
 * receive recurrent messages to remind them to contribute to open source. If not then do nothing.
 * @param roleToAssign
 * @param toAdd
 * @param message
 */
async function tryAddOpenSourceUserSubscription(
  roleToModify: string,
  toAdd: boolean,
  message: Message
) {
  if (roleToModify === config.ROLE.OPEN_SOURCE.name) {
    // Get the subscriptions of the user that sent the given message
    const doc = await db
      .collection('usersSubscriptions')
      .doc(message.author.id)
      .get();
    const data = doc.data();
    const subscriptions: string[] = data != null ? data.subscriptions : [];

    // Add the open source subscription to the list of existing subscriptions
    if (toAdd) {
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
    } else {
      await db.collection('userSubscription').doc(message.author.id).delete();
    }
  }
}
