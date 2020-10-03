import axios, { AxiosRequestConfig } from 'axios';
import { Message, MessageEmbed } from 'discord.js';

const req = async(q: string): Promise<any[]> => {
    const config: AxiosRequestConfig = {
        url: `https://api.github.com/search/repositories`,
        params: { q }
    };

    if(process.env.GITHUB_TOKEN) config.headers = { 'Authorization': `token ${process.env.GITHUB_TOKEN}` };

    try {
        return (await axios(config)).data.items;
    } catch (err) {
        if(err.response.status === 403) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await req(q));
                }, Number(err.response.headers['x-ratelimit-reset']) * 1000 - Date.now() + 2000);
            });
        }
    }

    return [];
}

/**
 * This command returns a URL for the user to create an issue in the specified github repository
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    message.channel.send('To which repository would you like to create an issue?')
    try {
        // await repository name
        let repository = await message.channel.awaitMessages((m: Message) => m.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
            const res = collected.first();
            if(res) return res.content;
            else return 'EddieBot';
        }).catch(() => { throw new Error('You took too long to reply (`10 seconds`). Try again.') });

        // query max length is 256 chars
        repository = encodeURI(repository);
        if(repository.length > 256) repository.substr(0, 256);

        const items = await req(repository);

        if(!items) return `Could not find repository with name \`${repository}\`.`;
        let url = `${items[0].html_url}/issues/new`;

        if(arg) url += `?title=${encodeURI(arg)}`;
        return `Here you go: <${url}>`;
    } catch (error) {
        return error.message;
    }
}

export const description = 'Create a link for an issue on a github repository';

export const triggers = ['issue'];

export const usage = `${triggers[0]} <title>`;