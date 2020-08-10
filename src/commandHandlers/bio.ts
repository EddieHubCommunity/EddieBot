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
    const field = args[0].toLowerCase().trim();
    if (field.length && !mention && !config.BIO.includes(field.trim())) {
        embed
        .setTitle('Edit Bio (error)')
        .setDescription(`Bio option not valid, please use one of the following: ${config.BIO.join(', ')}`)
        .addField('ERROR', 'Invalid argument')
        .addField('Usage', usage)

        return embed;
    }

    // get information
    if (!field.length || (!args[1] && mention)) {
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

    const updateBio = async (data: string | object, entry: string, msg: Message) => {
        embed.setDescription(`Updating your bio with ${field}`);
        await db
            .collection('users')
            .doc(msg.author.id)
            .set({
                avatar: msg.author.avatarURL(),
                username: msg.author.username,
                joinedAt: firebase.firestore.Timestamp.fromDate(msg.author.createdAt),
                bio: {
                    [entry]: data
                },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

        const role = msg.guild!.roles.cache.find((r) => r.name === config.ROLE.BIO.name);
        const member = msg.member;
        await member!.roles.add(role!);
    }

    // set information
    if (args[1]) {
        let data = args[1].trim();

        switch(field) {
            case 'location':
                try {
                    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(data)}&format=json&limit=1`;
                    const response = await axios.default.get(url);
                    data = response.data ? response.data[0] : {};
                    updateBio(data,field,message);
                } catch (e) {
                    log.error(`ERROR: Couldn't get location ${data}`);
                }
                break;
            case 'twitter':
                if(data.match(/^@?(\w){1,15}$/i)) {
                    data = `https://twitter.com/${data}`;
                    updateBio(data,field,message);
                } else {
                    embed.addField('Description', 'Twitter Handle - Unexpected format');
                    embed.addField('Example', `${config.COMMAND_PREFIX}bio twitter || @example`);
                    embed.addField('Example', `${config.COMMAND_PREFIX}bio twitter || example`);
                }
                break;
            default:
                updateBio(data,field,message);
                break;
        }
    }

    embed
        .setTitle('Bio')
        .setFooter(mention ? mention!.username : message.author.username, (mention ? mention!.avatarURL() : message.author.avatarURL()) || '')

    return embed;
};

export const description = 'Get & Set your bio information for others to find you social platforms';

export const triggers = ['bio'];

export const usage = `${triggers[0]} <key> || <value> or ${triggers[0]} or ${triggers[0]} <@user>`;
