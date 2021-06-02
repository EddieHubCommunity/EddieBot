import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import * as alex from 'alex';
import config from '../config';

const { defaultEmbed, alexWhitelist, preventWords } = config;

@Injectable()
export class AlexService {
  private stripSpecialCharacters(str: string) {
    // alexMatch special symbols and replace with ' '
    str = str.replace(/[.,/#!$%?&*;:{}=\-_'"“”~()]/g, ' ');
    // alexMatch double whitespace with single space for cleaner string
    return str.replace(/\s{2,}/g, ' ');
  }

  public checkAlex(message: Message) {
    if (message.author.bot) {
      return;
    }

    // Modify text by removing redundancy and special characters
    const messageText = [
      ...new Set(this.stripSpecialCharacters(message.content).split(' ')),
    ].join(' ');
    const alexMatch = alex.markdown(messageText, alexWhitelist as alex.Config)
      .messages;

    if (alexMatch.length) {
      const embed = defaultEmbed(config.colors.alerts)
        .setTitle(`You used the word "${alexMatch[0].actual}"`)
        .setDescription(
          'This might not be inclusive or welcoming language. Please consider the following suggestions instead:',
        );

      alexMatch.forEach((suggestion) => {
        const field = suggestion.note ? suggestion.note : 'See above ^^';
        return embed.addField(suggestion.reason, field);
      });

      return message.channel.send(embed);
    }

    if (!alexMatch.length) {
      const eddiehubMatch = preventWords.find((word) =>
        messageText.toLowerCase().includes(word),
      );

      if (eddiehubMatch) {
        const embed = defaultEmbed(config.colors.alerts)
          .setTitle(`You used the word "${eddiehubMatch}"`)
          .setDescription('This might not be inclusive or welcoming language');

        return message.channel.send(embed);
      }
    }

    return;
  }
}
