import { MessageEmbed } from 'discord.js';

export const command = async (arg: string, embed: MessageEmbed) => {
    const args = arg.split('||');
    embed
        .setTitle('Standup')
        .setDescription('What I did yesterday and what I will do today')
        .addField('Yesterday', args[0])
        .addField('Today', args[1])

    return embed;
};

export const description = 'Share your standup notes with the community';

export const triggers = ['standup'];
