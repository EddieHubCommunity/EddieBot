import { MessageReaction } from 'discord.js';

import config from './config';

const { REACTIONS_COUNT, ROLE } = config;

export const messageReactionAdd = async (reaction: MessageReaction) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    // if message owner gets 5+ reactions add "high value" role
    if (reaction.count! >= REACTIONS_COUNT) {
        const role = reaction.message.guild!.roles.cache.find((r) => r.name === ROLE.HIGH_VALUE);
        const member = reaction.message.member;
        await member!.roles.add(role!);
    }
};
