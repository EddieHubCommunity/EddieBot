import { EmbedBuilder } from 'discord.js';

import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { errorHandler } from '../utils/errorHandler.js';
import { BannedWordsOptions } from '../config/BannedWordsOptions.js';
import { getBannedWordConfig } from '../utils/getBannedWordConfig.js';

export const checkBannedWords = async (
  bot: ExtendedClient,
  content: string,
  serverId: string,
): Promise<EmbedBuilder[]> => {
  const embeds: EmbedBuilder[] = [];
  try {
    const config = await getBannedWordConfig(bot, serverId);
    const checkWords = config?.bannedWordConfig
      ? config.bannedWordConfig
      : BannedWordsOptions;
    content.split(' ').forEach((word) => {
      if (checkWords.includes(word.toLowerCase())) {
        const embed = new EmbedBuilder();
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
