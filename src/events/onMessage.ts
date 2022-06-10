import { Message } from 'discord.js';
import { checkContent } from '../alexjs/checkContent';
import { stripSpecialCharacters } from '../alexjs/stripSpecialCharacters';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

export const onMessage = async (bot: ExtendedClient, message: Message) => {
  try {
    if (message.author.bot || !message.content || !message.guild) {
      return;
    }
    // run alex!!

    const cleaned = stripSpecialCharacters(message.content);

    const result = await checkContent(bot, cleaned, message.guild.id);

    if (!result.length) {
      return;
    }

    await message.channel.send({ embeds: result.slice(0, 10) });
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
