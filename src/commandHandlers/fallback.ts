import { MessageEmbed } from 'discord.js';

import config from '../config';

const { COMMAND_PREFIX } = config;

export const fallback = (embed: MessageEmbed) => {
  return embed
    .setTitle('ERROR: ooops...command not found')
    .setDescription(`Try using the ${COMMAND_PREFIX}help command.`);
};
