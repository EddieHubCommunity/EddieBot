import { MessageEmbed } from 'discord.js';
//@ts-ignore
import * as soundex from 'soundex-code';

import config from '../config';
import commandList from './index';

const { COMMAND_PREFIX } = config;

export const fallback = async (arg: string, embed: MessageEmbed) => {
  const command = arg;

  const maxLength = 2;
  const map = new Map();
  commandList
      .forEach((commandItem) => map.set(commandItem, soundex(commandItem.triggers[0], maxLength)));

  const reverseMap = new Map();
  for (const [key, value] of map.entries()) {
      const previous = reverseMap.get(value) || [];
      previous.push(key);
      reverseMap.set(value, previous);
  }

  const similarCommands = reverseMap.get(soundex(command, maxLength));

  embed
      .setTitle('ERROR: ooops...command not found');

  if (similarCommands && similarCommands.length) {
      embed
          .setDescription('Here is a list of similar commands');

      similarCommands
          //@ts-ignore
          .forEach((commandItem) => embed
              .addField(`${COMMAND_PREFIX}${commandItem.triggers[0]}`, `${commandItem.description}\nUsage: ${COMMAND_PREFIX}${commandItem.usage}`, false));
  } else {
      embed
          .setDescription(`Try using the ${COMMAND_PREFIX}help command.`);
  }

  return embed;
};
