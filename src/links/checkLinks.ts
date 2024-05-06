import { Message, PartialMessage } from 'discord.js';

import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

const allowedLinks = ['github.com'];
const urlPattern = /(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?/;

export const checkLinks = async (
  bot: ExtendedClient,
  message: Message | PartialMessage,
): Promise<void> => {
  const content = message.content;

  try {
    const urlMatch = content?.match(urlPattern);
    if (!urlMatch) {
      return;
    }

    if (urlMatch) {
      if (allowedLinks.every((link) => urlMatch[0].includes(link))) {
        return;
      }
    }

    await message.delete();

    return;
  } catch (error) {
    await errorHandler(bot, error, 'link checking');
    return;
  }
};
