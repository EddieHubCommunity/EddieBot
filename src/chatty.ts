import { Message } from 'discord.js';

import config from './config';

const { COMMAND_PREFIX } = config;

const stats: { [key: string]: { messageCount: number } } = {};

export const chatty = async (message: Message) => {
  if (message.content.startsWith(COMMAND_PREFIX) || message.author.bot) {
    return;
  }

  if (message.member!.partial) {
    await message.member!.fetch;
  }

  const userId: string = message.member!.id;

  try {
    stats[userId].messageCount++;
  } catch {
    stats[userId] = {
      messageCount: 1,
    };
  }

  // console.log(stats);

  // @TODO: save status in DB
};
