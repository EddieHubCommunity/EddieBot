import { Client, MessageEmbed } from 'discord.js';

import config from '../config';

const { COMMAND_PREFIX } = config;

export const fallback = async (arg: string, client: Client, embed: MessageEmbed) => {
  return embed
    .setTitle('ERROR: ooops...command not found')
    .setDescription(`Try using the ${COMMAND_PREFIX}help command.`);
};
