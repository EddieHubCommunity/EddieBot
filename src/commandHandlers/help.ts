import { MessageEmbed } from 'discord.js';

import config from '../config';
import commandList from './index';

const { COMMAND_PREFIX } = config;

export const command = async (arg: [string, string], embed: MessageEmbed) => {
  const matching = commandList.find(({ triggers }) =>
    triggers.find((trigger) => trigger === arg[1])
  );

  embed.setTitle('Help commands').setDescription('Lists the command available');

  if (matching) {
    embed.addField(
      `${COMMAND_PREFIX}${matching.triggers[0]}`,
      `${matching.description}\nUsage: ${COMMAND_PREFIX}${matching.usage}`,
      false
    );
  } else {
    let text = '';
    commandList.forEach((commandItem) => {
      text = text
        .concat(`**${COMMAND_PREFIX}${commandItem.triggers[0]}**  `)
        .concat(`${commandItem.description}\n`)
        .concat(
          'Usage:' + '`' + `${COMMAND_PREFIX}${commandItem.usage}\n` + '`'
        );
    });
    embed.addField('\u200b', text);
  }

  return embed;
};

export const description = 'Lists available commands';

export const triggers = ['help'];

export const usage = triggers[0];
