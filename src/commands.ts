import { Message } from 'discord.js';

import commandList, { fallback } from './commandHandlers';
import config from './config';

const { COMMAND_PREFIX, defaultEmbed } = config;

export const commands = async (message: Message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.slice(COMMAND_PREFIX.length);
    const command = args.split(/ +/).shift()!.toLowerCase();

    const embed = defaultEmbed();

    const matching = commandList
        .find(({ triggers }) => triggers
            .find((trigger) => trigger === command)) || { command: fallback };

    if (matching.command === fallback) {
        message.channel.send(await matching.command(command, embed, message));
    } else {
        message.channel.send(await matching.command(args.slice(command.length + 1), embed, message));
    }
};
