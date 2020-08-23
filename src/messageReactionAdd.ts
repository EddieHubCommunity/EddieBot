import { MessageReaction } from 'discord.js';

import config from './config';
import { log } from './logger';
import { getUserRoles } from './commandHandlers/guild.service';

const { REACTIONS_COUNT, ROLE } = config;

const getTotalReactionCount = async (reaction: MessageReaction) => {
    // Map through each reaction emoji and return the count
    const getReactionCounts = reaction.message.reactions.cache
        .filter((r) => !r.users.cache.has(reaction.message.author.id)) // remove the message author's reactions
        .map(async (r) => {
            if (r.partial) {
                try {
                    await r.fetch();
                } catch (error) {
                    return Promise.resolve(0);
                }
            }

            return Promise.resolve(r.count!);
        });

    const results = await Promise.all(getReactionCounts);

    // reduce down the array of numbers to the count of reactions
    return results.reduce((acc, current) => acc + current, 0);
}

export const messageReactionAdd = async (reaction: MessageReaction) => {
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
        const reactionsCount = await getTotalReactionCount(reaction)

        // if message owner gets 5+ reactions add "high value" role
        if (reactionsCount >= REACTIONS_COUNT) {
            const isAssignedRole = (await getUserRoles(reaction.message.member!)).includes(ROLE.HIGH_VALUE.name);

            if(isAssignedRole) return;

            const role = reaction.message.guild!.roles.cache.find((r) => r.name === ROLE.HIGH_VALUE.name);

            reaction.message.member!.roles.add(role!);
            log.info(`Role "${ROLE.HIGH_VALUE.name}" added to: `, reaction.message.member!.displayName);
        }
    } catch (error) {
        log.error('Something went wrong when counting the reactions: ', error);
    }
};
