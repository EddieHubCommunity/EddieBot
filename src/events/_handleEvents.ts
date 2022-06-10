import { ExtendedClient } from '../interfaces/ExtendedClient';

export const handleEvents = (bot: ExtendedClient) => {
  bot.on('ready', () => {
    console.log('Connected to Discord!');
  });
};
