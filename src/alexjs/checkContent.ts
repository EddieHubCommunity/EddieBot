import alex from 'alex';
import { MessageEmbed } from 'discord.js';

import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import { getAlexConfig } from '../utils/getAlexConfig';

export const checkContent = async (
  bot: ExtendedClient,
  content: string,
  serverId: string,
): Promise<MessageEmbed[]> => {
  try {
    const config = await getAlexConfig(bot, serverId);
    const rawResult = alex.markdown(content, config.alexConfig).messages;

    const embeds: MessageEmbed[] = [];
    for (const message of rawResult) {
      const embed = new MessageEmbed();
      embed.setTitle(`You used ${message.actual}`);
      embed.setDescription(
        'This might not be inclusive or welcoming language. Please update / edit your message with the following suggestions instead:',
      );
      if (message.reason) {
        embed.addField(message.reason, message.note || 'see above :)');
      }
      embeds.push(embed);
    }

    return embeds;
  } catch (error) {
    await errorHandler(bot, error, 'alexjs check content');
    return [];
  }
};
