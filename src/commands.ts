import { Message } from 'discord.js';

import commandList, { fallback } from './commandHandlers';
import config from './config';
import cooldown from './cooldown';

const { COMMAND_PREFIX, defaultEmbed } = config;

export const commands = async (message: Message) => {
  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
    return;
  }

  if (cooldown.isCooled(message.author.id)) {
    message.channel.send(
      `:clock1: Too fast! Only **1** command each **${config.COOLDOWN_SECONDS}** seconds.`
    );
    return;
  }

  const args = message.content.slice(COMMAND_PREFIX.length);
  const command = args.split(/ +/).shift()!.toLowerCase();

  const embed = defaultEmbed();

  const matching = commandList.find(({ triggers }) =>
    triggers.find((trigger) => trigger === command)
  ) || { command: fallback };

  message.channel.send(
    await matching.command([command, args.slice(command.length + 1)], embed, message)
  );
  cooldown.setCool(message.author.id);
};
