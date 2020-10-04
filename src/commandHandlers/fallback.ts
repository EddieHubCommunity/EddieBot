import { MessageEmbed } from 'discord.js';

import config from '../config';
import { suggestSimilarCommands } from '../suggestSimilarCommands';

const { COMMAND_PREFIX } = config;

export const fallback = async (arg: string, embed: MessageEmbed) => {
  const command = arg;
  const similarCommands = suggestSimilarCommands(command);

  embed
      .setTitle('ERROR: ooops...command not found');

  if (similarCommands && similarCommands.length) {
      embed
          .setDescription('Here is a list of similar commands');

      similarCommands
          .forEach((commandItem: {command: (arg: string, embed: MessageEmbed) => Promise<MessageEmbed>, description: string, triggers: Array<string>, usage: string}) => embed
              .addField(`${COMMAND_PREFIX}${commandItem.triggers[0]}`, `${commandItem.description}\nUsage: ${COMMAND_PREFIX}${commandItem.usage}`, false));
  } else {
      embed
          .setDescription(`Try using the ${COMMAND_PREFIX}help command.`);
  }

  return embed;
};
