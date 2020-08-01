import { MessageEmbed, Message } from 'discord.js';
import * as firebase from 'firebase-admin';
import * as axios from 'axios';

import { getUserRoles } from './guild.service';
import config from '../config';
import { db } from '../firebase';
import { log } from '../logger';

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
        const roles = await getUserRoles(message.member!);

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
            embed.addField('Example', `${config.COMMAND_PREFIX}bio description || I am a ...`);
            embed.addField('Example', `${config.COMMAND_PREFIX}bio location || London, UK`);
        }

        const numberOfRoles = roles.length;
        if(roles && numberOfRoles > 0){
            embed.addField(`Roles (${numberOfRoles})`, roles.join(', ').toUpperCase());
        }
    }

    // set information
    if (args[1]) {
        const field = args[0].toLowerCase().trim();
        let data = args[1].trim();

        if (field === 'location') {
            try {
                const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(data)}&format=json&limit=1`;
                const response = await axios.default.get(url);

                data = response.data ? response.data[0] : {};
            } catch (e) {
                log.error(`ERROR: Couldn't get location ${data}`);
            }
        }

        embed.setDescription(`Updating your bio with ${field}`);
        await db
            .collection('users')
            .doc(message.author.id)
            .set({
                avatar: message.author.avatarURL(),
                username: message.author.username,
                joinedAt: firebase.firestore.Timestamp.fromDate(message.author.createdAt),
                bio: {
                    [field]: data
                },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

        const role = message.guild!.roles.cache.find((r) => r.name === config.ROLE.BIO.name);
        const member = message.member;
        await member!.roles.add(role!);
    }

    embed
        .setTitle('Bio')
        .setFooter(mention ? mention!.username : message.author.username, (mention ? mention!.avatarURL() : message.author.avatarURL()) || '')

    return embed;
};

export const description = 'Get & Set your bio information for others to find you social platforms';

export const triggers = ['bio'];

export const usage = `${triggers[0]} <key> || <value> or ${triggers[0]} or ${triggers[0]} <@user>`;
