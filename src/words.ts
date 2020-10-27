import { Message } from 'discord.js';
import alex from 'alex';

import config from './config';

const { defaultEmbed } = config;

/**
 * Runs for every message
 * and checks for not recommended words
 * and replies with suggestions
 *
 * @param message
 */
export const words = async (message: Message) => {
  if (message.author.bot) {
    return;
  }

  const match = alex.markdown(message.content).messages;

  if (match.length) {
    const embed = defaultEmbed()
      .setTitle(`You used the word "${match[0].actual}"`)
      .setDescription(
        'In future, please use one of the following suggestions instead...'
      );

    match.forEach((suggestion) =>
      embed.addField(suggestion.reason, suggestion.note ? suggestion.note : '')
    );

    return message.channel.send(embed);
  }

  return;
};
