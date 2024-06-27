import { Client, Partials } from 'discord.js';
import { IntentOptions } from './config/IntentOptions.js';
import { connectDb } from './database/connectDb.js';
import { handleEvents } from './events/_handleEvents.js';
import type { ExtendedClient } from './interfaces/ExtendedClient.js';
import { errorHandler } from './utils/errorHandler.js';
import { loadCommands } from './utils/loadCommands.js';
import { registerCommands } from './utils/registerCommands.js';
import { validateEnv } from './utils/validateEnv.js';

import express from 'express';
const app = express();
const port = 8080;

(async () => {
  const bot = new Client({
    intents: IntentOptions,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  }) as ExtendedClient;
  validateEnv(bot);
  bot.cache = {};
  bot.commands = await loadCommands(bot);

  handleEvents(bot);

  await connectDb(bot);

  await bot
    .login(process.env.DISCORD_TOKEN)
    .catch((err) => errorHandler(bot, err, 'login'));
  await registerCommands(bot);

  // used for DigitalOcean's app health check otherwise it kills the app
  app.get('/', (req, res: any) => {
    res.send('Discord bot is running');
  });

  app.listen(port, () => {
    console.log('API is running');
  });
})();
