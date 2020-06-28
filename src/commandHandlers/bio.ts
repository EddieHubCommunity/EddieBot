import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';

import config from '../config';
import { db } from '../firebase';

/**
 * This command lets the user set their personal data if others want to follow them on other social platforms
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    const args = arg.split('||');
    const mention = message.mentions.users.first();

    if (args[0].length && !mention && !config.BIO.includes(args[0].trim())) {
        embed
        .setTitle('Edit Bio (error)')
        .setDescription(`Bio option not valid, please use one of the following: ${config.BIO.join(', ')}`)
        .addField('ERROR', 'Invalid argument')
        .addField('Usage', usage)

        return embed;
    }

    // get information
    if (!args[0].length || (!args[1] && mention)) {
        embed.setDescription('Reading bio');
        const doc = await db
            .collection('users')
            .doc(mention ? mention!.id : message.author.id)
            .get();
        const data = doc.data();

        if (data) {
            Object.entries((data).bio).forEach(([key, value]) => embed.addField(key.toUpperCase(), value));
        } else {
            embed.addField('Description', 'No bio details found');
        }
    }

    // set information
    if (args[1]) {
        const field = args[0].toLowerCase();
        const data = args[1].toLowerCase();

        embed.setDescription('Updating your bio')
            .addField(args[0], data);
        await db
            .collection('users')
            .doc(message.author.id)
            .set({
                avatar: message.author.avatarURL(),
                username: message.author.username,
                joinedAt: firebase.firestore.Timestamp.fromDate(message.author.createdAt),
                bio: {
                    [field]: args[1]
                },
                updateAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
    }

    embed
        .setTitle('Bio')
        .setFooter(mention ? mention!.username : message.author.username, (mention ? mention!.avatarURL() : message.author.avatarURL()) || '')

    return embed;
};

export const description = 'Get & Set your bio information for others to find you social platforms';

export const triggers = ['bio'];

export const usage = `${triggers[0]} <key> || <value> or ${triggers[0]} or ${triggers[0]} <@user>`;
