import { MessageEmbed } from 'discord.js';

import config from '../config';
import commandList from './index';

const { COMMAND_PREFIX } = config;

export const command = async (embed: MessageEmbed) => {
  embed.setTitle('Help commands').setDescription('Lists the command available');

  commandList.forEach((commandItem) => {
    const mainTrigger = `${COMMAND_PREFIX}${commandItem.triggers[0]}`;

    embed.addField(mainTrigger, commandItem.description, true);
  });

  return embed;
};

export const description = 'Lists available commands';

export const triggers = ['help'];
