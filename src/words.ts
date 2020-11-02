import { Message } from 'discord.js';

import config from './config';

const { defaultEmbed, WORDS } = config;

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

  const match = WORDS.checks.find((word) =>
    WORDS.prepend.find(
      (prepend) =>
        message.content.toLowerCase().includes(`${prepend} ${word.check}`) ||
        WORDS.append.find((append) =>
          message.content.toLowerCase().includes(`${word.check}${append}`)
        )
    )
  );
  if (match) {
    const embed = defaultEmbed()
      .setTitle(`You used the word "${match.check.toUpperCase()}"`)
      .setDescription(
        'This might not be inclusive or welcoming language. Please consider the following suggestions instead:'
      );

    match.suggestions.forEach((suggestion) =>
      embed.addField(suggestion, 'Is another alternative')
    );

    return message.channel.send(embed);
  }

  return;
};
