import ServerConfig from '../database/models/ServerConfig.js';
import type { ExtendedClient } from '../interfaces/ExtendedClient.js';

export const getBannedWordConfig = async (
  bot: ExtendedClient,
  serverId: string,
) => {
  if (bot.cache[serverId]) {
    return bot.cache[serverId];
  }

  const config = await ServerConfig.findOne({ serverId });

  if (config) {
    bot.cache[serverId] = { bannedWordConfig: config.bannedWordConfig };
    return { bannedWordConfig: config.bannedWordConfig };
  }

  const newConfig = await ServerConfig.create({
    serverId,
    bannedWordConfig: [],
  });

  bot.cache[serverId] = { bannedWordConfig: newConfig.bannedWordConfig };
  return { bannedWordConfig: newConfig.bannedWordConfig };
};
