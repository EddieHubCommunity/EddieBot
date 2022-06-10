import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';
import { connectDb } from './database/connectDb';
import { handleEvents } from './events/_handleEvents';
import { ExtendedClient } from './interfaces/ExtendedClient';

(async () => {
  const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
  bot.cache = {};

  handleEvents(bot);

  await connectDb();

  await bot.login(process.env.DISCORD_TOKEN);
})();
