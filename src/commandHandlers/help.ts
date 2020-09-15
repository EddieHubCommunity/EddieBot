import { MessageEmbed } from 'discord.js';

import config from '../config';
import commandList from './index';

const { COMMAND_PREFIX } = config;

export const command = async (arg: string, embed: MessageEmbed) => {
    embed
        .setTitle('Help commands')
        .setDescription('Lists the command available');

    commandList
        .forEach((commandItem) => embed
            .addField(`${COMMAND_PREFIX}${commandItem.triggers[0]}`, `${commandItem.description}\nUsage: ${COMMAND_PREFIX}${commandItem.usage}`, false));

    return embed;
};

export const description = 'Lists available commands';

export const triggers = ['help'];

export const usage = triggers[0];
