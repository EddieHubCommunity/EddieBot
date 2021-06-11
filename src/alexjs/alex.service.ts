import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';
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

  public check(message: Message): MessageEmbed[] {
    // Modify text by removing redundancy and special characters
    const messageText = [
      ...new Set(this.stripSpecialCharacters(message.content).split(' ')),
    ].join(' ');
    const alexMatch = alex.markdown(messageText, alexWhitelist as alex.Config)
      .messages;

    const notifications: MessageEmbed[] = [];
    if (alexMatch.length) {
      const embed = defaultEmbed(config.colors.alerts)
        .setTitle(`You used the word "${alexMatch[0].actual}"`)
        .setDescription(
          'This might not be inclusive or welcoming language. Please consider the following suggestions instead:',
        )
        .setAuthor(message.author.username, message.author.displayAvatarURL());

      alexMatch.forEach((suggestion) => {
        const field = suggestion.note ? suggestion.note : 'See above ^^';
        return embed.addField(suggestion.reason, field);
      });

      notifications.push(embed);
    }

    const splitMessage = messageText.split(' ');

    if (!alexMatch.length) {
      splitMessage.forEach((word) => {
        if (preventWords.includes(word.toLowerCase())) {
          const embed = defaultEmbed(config.colors.alerts)
            .setTitle(`You used the word "${word}"`)
            .setDescription('This might not be inclusive or welcoming language')
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL(),
            );

          notifications.push(embed);
        }
      });
    }

    return notifications;
  }
}
