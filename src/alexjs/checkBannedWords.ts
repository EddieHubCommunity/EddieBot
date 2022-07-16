import { MessageEmbed } from 'discord.js';

import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import { BannedWordsOptions } from '../config/BannedWordsOptions';
import { getBannedWordConfig } from '../utils/getBannedWordConfig';

export const checkBannedWords = async (
  bot: ExtendedClient,
  content: string,
  serverId: string,
): Promise<MessageEmbed[]> => {
  const embeds: MessageEmbed[] = [];
  try {
    const config = await getBannedWordConfig(bot, serverId);
    const checkWords = config.bannedWordConfig
      ? config.bannedWordConfig
      : BannedWordsOptions;
    content.split(' ').forEach((word) => {
      if (checkWords.includes(word.toLowerCase())) {
        const embed = new MessageEmbed();
        embed.setTitle(`You used the word "${word}"`);
        embed.setDescription(
          'This might not be inclusive or welcoming language',
        );
        embeds.push(embed);
      }
    });

    return embeds;
  } catch (error) {
    await errorHandler(bot, error, 'alexjs check content');
    return [];
  }
};
