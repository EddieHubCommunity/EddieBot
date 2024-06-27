import { WebhookClient } from 'discord.js';
import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { logHandler } from './logHandler.js';

export const validateEnv = (bot: ExtendedClient) => {
  if (!process.env.DISCORD_TOKEN) {
    logHandler.log('error', 'Missing "DISCORD_TOKEN" environment variables!');
    process.exit(1);
  }
  if (!process.env.EDDIEBOT_MONGO_CONNECTION_STRING) {
    logHandler.log(
      'error',
      'Missing "EDDIEBOT_MONGO_CONNECTION_STRING" environment variables!',
    );
    process.exit(1);
  }
  if (!process.env.HOME_GUILD) {
    logHandler.log('error', 'Missing "HOME_GUILD" environment variables!');
    process.exit(1);
  }

  bot.config = {
    token: process.env.DISCORD_TOKEN,
    dbUri: process.env.EDDIEBOT_MONGO_CONNECTION_STRING,
    debugHook: process.env.DEBUG_HOOK
      ? new WebhookClient({
          url: process.env.DEBUG_HOOK,
        })
      : undefined,
    homeGuild: process.env.HOME_GUILD,
  };
};
