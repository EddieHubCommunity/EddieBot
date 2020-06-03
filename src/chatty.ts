import { Message } from 'discord.js';

const stats: { [key: string]: { messageCount: number } } = {};

export const chatty = async (message: Message) => {
    const prefix = '!';
    if (message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    if (message.member!.partial) {
        await message.member!.fetch;
    }

    const userId: string = message.member!.id;

    try {
        stats[userId].messageCount++;
    } catch {
        stats[userId] = {
            messageCount: 1,
        };
    }

    // console.log(stats);

    // @TODO: save status in DB
};
