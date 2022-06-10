import { Message } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';

export const onMessage = async (bot: ExtendedClient, message: Message) => {
  if (message.author.bot) {
    return;
  }

  // run alex!!
};
