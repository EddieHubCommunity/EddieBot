import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { onInteraction } from './onInteraction.js';
import { onMessage } from './onMessage.js';
import { onUpdate } from './onUpdate.js';
import { onDelete } from './onDelete.js';

export const handleEvents = (bot: ExtendedClient) => {
  bot.on('ready', () => {
    console.log('Connected to Discord!');
  });

  bot.on('messageCreate', async (message) => {
    await onMessage(bot, message);
  });

  bot.on('messageUpdate', async (oldMessage, newMessage) => {
    await onUpdate(bot, oldMessage, newMessage);
  });

  bot.on('messageDelete', async (message) => {
    await onDelete(bot, message);
  });

  bot.on('interactionCreate', async (interaction) => {
    await onInteraction(bot, interaction);
  });
};
