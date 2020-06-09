import * as pino from 'pino';
import { TextChannel } from 'discord.js';

import { client } from './client';
import config from './config';

const logger = pino({
    prettyPrint: { colorize: true }
});

const discordLog = async (type: string, message: string, details?: string) => {
    const channel = <TextChannel> client.channels.cache.get(config.BOT_CHANNEL);

    if (!channel) {
        return logger.error('Channel not found');
    };

    logger[type](message, details);

    await channel.send(`${type.toUpperCase()}: ${message} - ${details}`);
}

export const log = {
    info: (message: string, details?: string) => discordLog('info', message, details),
    warn: (message: string, details?: string) => discordLog('warn', message, details),
    error: (message: string, details?: string) => discordLog('error', message, details),
    fatal: (message: string, details?: string) => discordLog('fatal', message, details),
}
