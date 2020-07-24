import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';

import { selfAssignableRoles } from '../config';
import { db } from '../firebase';
import { getUserRoles } from './guild.service';
import { log } from '../logger';

/**
 * This command assigns the role given in the argument to the user that executed the command, if that role can be
 * self-assigned.
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    const roleToAssign = arg;
    // Check if the user provided the role argument
    if (!roleToAssign) {
        return buildErrorEmbed('Missing arguments');
    }

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

        // Save the user's role to the DB
        await db
            .collection('users')
            .doc(message.author.id)
            .set({
                roles: getUserRoles(message.member!),
                updateAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

        const userName = message.member!.displayName || ''
        return embed.setDescription(`**${userName}** You now have the **${role.name}** role`);
    }

    return buildErrorEmbed(`The role you specified is not self-assignable, try one of these roles:
    ${selfAssignableRoles.join(', ')}
    `);

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

export const usage = `${triggers[0]} <role name>`;
