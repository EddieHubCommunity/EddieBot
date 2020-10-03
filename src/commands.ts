import { Collection, Message, Snowflake } from 'discord.js';

import commandList, { fallback } from './commandHandlers';
import config from './config';

const { COMMAND_PREFIX, defaultEmbed } = config;

const cooldownCollection = new Collection<Snowflake, number>();
export const commands = async (message: Message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
        return;
    }

    const embed = defaultEmbed();

    // handle cooldown
    const nextCommand = cooldownCollection.get(message.author.id);
    if(nextCommand && nextCommand > Date.now()) {
        message.channel.send(':clock1: Too fast! Only **1** command each **2** seconds.');
        return;
    }

    const args = message.content.slice(COMMAND_PREFIX.length);
    const command = args.split(/ +/).shift()!.toLowerCase();

    const matching = commandList
        .find(({ triggers }) => triggers
            .find((trigger) => trigger === command)) || { command: fallback };
    message.channel.send(await matching.command(args.slice(command.length + 1), embed, message));
    cooldownCollection.set(message.author.id, Date.now() + 2000); // 2 seconds interval between commands };
};
