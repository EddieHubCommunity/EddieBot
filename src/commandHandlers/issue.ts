import axios from 'axios';
import { load as cheerioLoad } from 'cheerio';
import { Message, MessageEmbed } from 'discord.js';

/**
 * This command lets the user create an issue from discord to a github repository
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    message.channel.send('To which repository would you like to create an issue?')
    try {
        // await repository name
        const repository = await message.channel.awaitMessages((m: Message) => m.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
            const res = collected.first();
            if(res) return res.content;
            else return 'EddieBot';
        }).catch(() => { throw new Error('You took too long to reply (`10 seconds`). Try again.') });

        let url = 'https://github.com';
        const { data } = await axios.get(`https://github.com/search?q=${encodeURI(repository)}`);
        const $ = cheerioLoad(data);
        const element = $('a.v-align-middle').first();
        const attr = element.attr();
        if(!attr) return `Could not find repository with name \`${repository}\`.`;
        url += `${attr.href}/issues/new`;

        if(arg) url += `?title=${encodeURI(arg)}`;
        return `Here you go: <${url}>`;
    } catch (error) {
        return error.message;
    }
}

export const description = 'Create a link for an issue on a github repository';

export const triggers = ['issue'];

export const usage = `${triggers[0]} <title>`;
