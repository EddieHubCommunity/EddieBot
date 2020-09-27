import { MessageEmbed, Message } from 'discord.js';


export const command = async(arg: string, embed: MessageEmbed, message: Message) => {

    const mention = message.mentions.users.first();

    return embed
        .addField('Support', `Hey ${mention ? mention!.username : message.author.username}, for help, questions or to submit a suggestion, please create a discussion on our GitHub Community`)
        .addField('Discussion', 'https://github.com/EddieJaoudeCommunity/support/discussions/category_choices');
};

export const description = 'Get Support information';

export const triggers = ['support'];

export const usage = `${triggers[0]} or ${triggers[0]} <@user>`;
