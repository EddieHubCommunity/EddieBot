import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';
import { connectDb } from './database/connectDb';
import { handleEvents } from './events/_handleEvents';
import { ExtendedClient } from './interfaces/ExtendedClient';
import { errorHandler } from './utils/errorHandler';
import { validateEnv } from './utils/validateEnv';

(async () => {
  const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
  validateEnv(bot);
  bot.cache = {};

  handleEvents(bot);

  await connectDb(bot);

  await bot
    .login(process.env.DISCORD_TOKEN)
    .catch((err) => errorHandler(bot, err, 'login'));
})();
