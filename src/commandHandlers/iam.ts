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
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    const args = arg.toLowerCase().split(',');
    // Check if the user provided the role argument
    if (!args) {
        return buildErrorEmbed('Missing arguments');
    }

    const rolesToAssign = args.map(x => x.trim());

    for(const roleToAssign of rolesToAssign) {
        // Check if the provided role is self-assignable
        if (selfAssignableRoles.find((role) => role === roleToAssign)) {
            const role = message.guild!.roles.cache.find((r) => r.name === roleToAssign);
            if (!role) {
                log.error(`ERROR: Couldn't get the role: ${roleToAssign}`);
                return buildErrorEmbed();
            }
            // Assign the role to the user of the message
            const member = message.member;
            await member!.roles.add(role);
            await tryAddOpenSourceUserSubscription(roleToAssign, message);
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
        .set({
            roles: await getUserRoles(message.member!),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

    const userName = message.member!.displayName || ''
    if (rolesToAssign.length > 1) {
        return embed.setDescription(`**${userName}** You now have the roles **${rolesToAssign.join(', ')}**`);
    } else {
        return embed.setDescription(`**${userName}** You now have the **${rolesToAssign[0]}** role`);
    }

    // Auxiliar function
    function buildErrorEmbed(errorMsg = 'An error has occurred') {
        return embed
            .setTitle('Role Assignment (error)')
            .setDescription(errorMsg)
            .addField('Usage', usage)
    }
};


export const description = 'Assign yourself a server role';

export const triggers = ['iam'];

export const usage = `${triggers[0]} <role name> || ${triggers[0]} <role name>, <role name>, ...`;

/**
 * Check if the role to assign is the open source role. If so, then add the open source subscription for the user to
 * receive recurrent messages to remind them to contribute to open source. If not then do nothing.
 * @param roleToAssign
 * @param message
 */
async function tryAddOpenSourceUserSubscription(roleToAssign: string, message: Message) {
    if (roleToAssign === config.ROLE.OPEN_SOURCE.name) {
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
            .set({
                subscriptions: [...subscriptions, UserSubscriptions.OPEN_SOURCE],
                username: message.author.username
            }, { merge: true });
    }
}
