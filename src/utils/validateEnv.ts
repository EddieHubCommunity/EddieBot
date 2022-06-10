import { WebhookClient } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { logHandler } from './logHandler';

export const validateEnv = (bot: ExtendedClient) => {
  if (
    !process.env.DISCORD_TOKEN ||
    !process.env.EDDIEBOT_MONGO_CONNECTION_STRING ||
    !process.env.DEBUG_HOOK ||
    !process.env.HOME_GUILD
  ) {
    logHandler.log('error', 'Missing environment variables!');
    process.exit(1);
  }

  bot.config = {
    token: process.env.DISCORD_TOKEN,
    dbUri: process.env.EDDIEBOT_MONGO_CONNECTION_STRING,
    debugHook: new WebhookClient({
      url: process.env.DEBUG_HOOK,
    }),
    homeGuild: process.env.HOME_GUILD,
  };
};
