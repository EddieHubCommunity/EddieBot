import { EmbedBuilder, Message, PartialMessage } from 'discord.js';

import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

const allowedLinks = ['github.com', 'eddiejaoude.io', 'gitlab.com'];
const urlPattern = /(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?/;

export const checkLinks = async (
  bot: ExtendedClient,
  message: Message | PartialMessage,
): Promise<EmbedBuilder | null> => {
  const content = message.content;

  // ignore link check in message from users who have the "team eddie" role
  if (message.member?.roles.cache.some((role) => role.name === 'team eddie')) {
    return null;
  }

  try {
    const urlMatch = content?.match(urlPattern);
    if (!urlMatch) {
      return null;
    }

    if (urlMatch) {
      if (allowedLinks.some((link) => urlMatch[0].includes(link))) {
        return null;
      }
    }

    await message.delete();

    const embed = new EmbedBuilder();
    embed.setTitle(
      `The user "${message.author?.username}" message contains a link`,
    );
    embed.setDescription(message.content);

    return embed;
  } catch (error) {
    await errorHandler(bot, error, 'link checking');
    return null;
  }
};
