import { Message } from 'discord.js';
import alex from 'alex';

import config from './config';

const { defaultEmbed, ALEX } = config;

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

  const match = alex.markdown(message.content, ALEX as alex.Config).messages;

  if (match.length) {
    const embed = defaultEmbed()
      .setTitle(`You used the word "${match[0].actual}"`)
      .setDescription(
        'This might not be inclusive or welcoming language. Please consider the following suggestions instead:'
      );

    match.forEach((suggestion) => {
      const field = suggestion.note ? suggestion.note : 'See above ^^';
      return embed.addField(suggestion.reason, field);
    });

    return message.channel.send(embed);
  }

  return;
};
