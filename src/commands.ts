import { Message } from 'discord.js';

import commandList, { fallback } from './commandHandlers';
import config from './config';

const { COMMAND_PREFIX, defaultEmbed } = config;

export const commands = (message: Message) => {
  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
    return;
  }

  const args = message.content.slice(COMMAND_PREFIX.length).split(/ +/);
  const command = args.shift()!.toLowerCase();

  const embed = defaultEmbed();

  const matching = commandList
    .find(({ triggers }) => triggers
      .find((trigger) => trigger === command)) || { command: fallback };

  message.channel.send(matching.command(embed));
};
