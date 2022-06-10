import { ExtendedClient } from '../interfaces/ExtendedClient';
import { onInteraction } from './onInteraction';
import { onMessage } from './onMessage';

export const handleEvents = (bot: ExtendedClient) => {
  bot.on('ready', () => {
    console.log('Connected to Discord!');
  });

  bot.on('messageCreate', async (message) => {
    await onMessage(bot, message);
  });

  bot.on('interactionCreate', async (interaction) => {
    await onInteraction(bot, interaction);
  });
};
