import { MessageReaction, User, PartialUser } from 'discord.js';

import config from './config';
import { log } from './logger';

const { REACTIONS_COUNT, ROLE } = config;

const getTotalReactionCount = async (reaction: MessageReaction, user: User | PartialUser) => {
    // Map through each reaction emoji and return the count
    const getReactionCounts = reaction.message.reactions.cache.map(async (value) => {
        if (value.partial) {
            try {
                await value.fetch();
            } catch (error) {
                return Promise.resolve(0);
            }
        }

        // ignore reactions from the message author
        if (user.id === reaction.message.author.id) {
            log.info('User can not get credit for reacting to their own message: ', reaction.message.member!.displayName);
            return Promise.resolve(0);
        }

        return Promise.resolve(value.count!);
    });

    const results = await Promise.all(getReactionCounts);

    // reduce down the array of numbers to the count of reactions
    return results.reduce((acc, current) => acc + current, 0);
}

export const messageReactionAdd = async (reaction: MessageReaction, user: User | PartialUser) => {
    if (user.partial) {
        try {
            await user.fetch();
        } catch (error) {
            log.error('Something went wrong when fetching the user: ', error);
            return;
        }
    }

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            log.error('Something went wrong when fetching the reaction: ', error);
            return;
        }
    }

    if (reaction.message.partial) {
        try {
            await reaction.message.member!.fetch();
        } catch (error) {
            log.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    if (reaction.message.member!.partial) {
        try {
            await reaction.message.member!.fetch();
        } catch (error) {
            log.error('Something went wrong when fetching the member: ', error);
            return;
        }
    }

    try {
        const reactionsCount = await getTotalReactionCount(reaction, user)

        // if message owner gets 5+ reactions add "high value" role
        if (reactionsCount >= REACTIONS_COUNT) {
            const role = reaction.message.guild!.roles.cache.find((r) => r.name === ROLE.HIGH_VALUE.name);

            reaction.message.member!.roles.add(role!);
            log.info(`Role "${ROLE.HIGH_VALUE.name}" added to: `, reaction.message.member!.displayName);
        }
    } catch (error) {
        log.error('Something went wrong when counting the reactions: ', error);
    }
};
