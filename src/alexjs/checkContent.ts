import { markdown } from 'alex';
import { EmbedBuilder } from 'discord.js';

import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { errorHandler } from '../utils/errorHandler.js';
import { getAlexConfig } from '../utils/getAlexConfig.js';
import { AlexJsOptions } from '../config/AlexJsOptions.js';

export const checkContent = async (
  bot: ExtendedClient,
  content: string,
  serverId: string,
): Promise<EmbedBuilder[]> => {
  try {
    const config = await getAlexConfig(bot, serverId);
    const rawResult = markdown(content, {
      ...AlexJsOptions.alexWhitelist,
      ...config?.alexConfig,
    }).messages;
    const embeds: EmbedBuilder[] = [];

    for (const message of rawResult) {
      const embed = new EmbedBuilder();
      embed.setTitle(`You used the word "${message.actual}"`);
      embed.setDescription(
        'This might not be inclusive or welcoming language. Please update / edit your message with the following suggestions instead:',
      );
      if (message.reason) {
        embed.addFields({
          name: message.reason,
          value: message.note || 'see above :)',
        });
      }
      embeds.push(embed);
    }

    return embeds;
  } catch (error) {
    await errorHandler(bot, error, 'alexjs check content');
    return [];
  }
};
