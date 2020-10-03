import { Collection, Message, Snowflake } from 'discord.js';

import commandList, { fallback } from './commandHandlers';
import config from './config';

const { COMMAND_PREFIX, defaultEmbed } = config;

const cooldownCollection = new Collection<Snowflake, number>();
export const commands = async (message: Message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
        return;
    }

    // handle cooldown
    const nextCommand = cooldownCollection.get(message.author.id);
    if(nextCommand && nextCommand > Date.now()) {
        message.channel.send(`:clock1: Too fast! Only **1** command each **${config.COOLDOWN_SECONDS}** seconds.`);
        return;
    }

    const args = message.content.slice(COMMAND_PREFIX.length);
    const command = args.split(/ +/).shift()!.toLowerCase();

    const embed = defaultEmbed();

    const matching = commandList
        .find(({ triggers }) => triggers
            .find((trigger) => trigger === command)) || { command: fallback };
    message.channel.send(await matching.command(args.slice(command.length + 1), embed, message));
    cooldownCollection.set(message.author.id, Date.now() + config.COOLDOWN_SECONDS * 1000); // add user to cooldown
};
