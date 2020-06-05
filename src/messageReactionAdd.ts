import { MessageReaction } from 'discord.js';

import config from './config';

const { REACTIONS_COUNT, ROLE } = config;

const getTotalReactionCount = async (reaction: MessageReaction) => {
    // Map through each reaction emoji and return the count
    const getReactionCounts = reaction.message.reactions.cache.map(async (value) => {
        if (value.partial) {
            try {
                await value.fetch();
            } catch (error) {
                return Promise.resolve(0)
            }
        }

        return Promise.resolve(value.count!)
    })

    const results = await Promise.all(getReactionCounts)

    // reduce down the array of numbers to the count of reactions
    return results.reduce((acc, current) => acc + current, 0)
}

export const messageReactionAdd = async (reaction: MessageReaction) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    const reactionsCount = await getTotalReactionCount(reaction)

    // if message owner gets 5+ reactions add "high value" role
    if (reactionsCount >= REACTIONS_COUNT) {
        const role = reaction.message.guild!.roles.cache.find((r) => r.name === ROLE.HIGH_VALUE);
        const member = reaction.message.member;
        await member!.roles.add(role!);
    }
};
