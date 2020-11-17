import { MessageEmbed } from 'discord.js';

import config from '../config';
import commandList, { CommandHandler } from './index';

const { COMMAND_PREFIX } = config;

export const command = async (arg: [string, string], embed: MessageEmbed) => {
  const matching = commandList.find(({ triggers }) =>
    triggers.find((trigger) => trigger === arg[1])
  );

  if (matching) {
    const usageTextOptions = matching.usage.split('or');
    const formatted = usageTextOptions.map(mapToCodeBlock).join(' or ');

    embed
      .setTitle(`${COMMAND_PREFIX}${matching.triggers[0]}`)
      .setDescription(
        `${matching.description}` + '\nUsage:\t' + `${formatted}`
      );
  } else {
    embed
      .setTitle('Help commands')
      .setDescription(
        'These are the available commands. For more information on a specific command, use `^help <commandName>`'
      );
    const format = (commandItem: CommandHandler) =>
      '`' + `${COMMAND_PREFIX}${commandItem.triggers[0]}` + '`';
    const text = commandList.map(format).join(' | ');
    embed.addField('\u200b', text);
  }

  return embed;
};

export const description = 'Lists available commands';

export const triggers = ['help'];

export const usage = triggers[0];
