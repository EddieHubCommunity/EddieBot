import { Client, Partials } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';
import { connectDb } from './database/connectDb';
import { handleEvents } from './events/_handleEvents';
import { ExtendedClient } from './interfaces/ExtendedClient';
import { errorHandler } from './utils/errorHandler';
import { loadCommands } from './utils/loadCommands';
import { registerCommands } from './utils/registerCommands';
import { validateEnv } from './utils/validateEnv';

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
