import ServerConfig from '../database/models/ServerConfig';
import { ExtendedClient } from '../interfaces/ExtendedClient';

export const getAlexConfig = async (bot: ExtendedClient, serverId: string) => {
  if (bot.cache[serverId]) {
    return bot.cache[serverId];
  }

  const config = await ServerConfig.findOne({ serverId });

  if (config) {
    bot.cache[serverId] = { alexConfig: config.alexConfig };
    return { alexConfig: config.alexConfig };
  }

  const newConfig = await ServerConfig.create({
    serverId,
    alexConfig: {
      profanitySureness: 1,
      noBinary: false,
      allow: [],
    },
  });

  bot.cache[serverId] = { alexConfig: newConfig.alexConfig };
  return { alexConfig: newConfig.alexConfig };
};
