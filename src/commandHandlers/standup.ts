import { MessageEmbed, Message } from 'discord.js';

/**
 * This command lets the user create a message for the daily standup in the community. For more information on
 * standups, check the link.
 *
 * {link https://www.atlassian.com/agile/scrum/standups}
 */
export const command = async (arg: string, embed: MessageEmbed, message: Message) => {
    // Note: The delete operation requires the permission "MANAGE_MESSAGES".
    // No need to await for the promise since sending the embed message doesn't depend on this message being deleted.
    if (message.deletable) {
        message.delete();
    }

    const args = arg.split('||');

    if (!args[0] || !args[1]) {
        embed
        .setTitle('Standup (error)')
        .setDescription('What I did yesterday and what I will do today')
        .addField('ERROR', 'Missing arguments')
        .addField('Usage', usage)

        return embed;
    }

    embed
        .setTitle('Standup')
        .setDescription('What I did yesterday and what I will do today')
        .addField('Yesterday', args[0])
        .addField('Today', args[1])
        .setFooter(message.author.username, message.author.avatarURL() || undefined)

    return embed;
};

export const description = 'Share your standup notes with the community. What you did yesterday and what you plan to do today, any blockers?';

export const triggers = ['standup'];

export const usage = `${triggers[0]} <notes from yesterday> || <notes for today>`
