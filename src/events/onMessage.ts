import { Message } from 'discord.js';
import { checkContent } from '../alexjs/checkContent';
import { checkBannedWords } from '../alexjs/checkBannedWords';
import { stripSpecialCharacters } from '../alexjs/stripSpecialCharacters';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

export const onMessage = async (bot: ExtendedClient, message: Message) => {
  try {
    if (message.author.bot || !message.content || !message.guild) {
      return;
    }

    const warnings = [];
    const cleaned = stripSpecialCharacters(message.content);
    warnings.push(...(await checkContent(bot, cleaned, message.guild.id)));
    warnings.push(...(await checkBannedWords(bot, cleaned, message.guild.id)));

    warnings.map((warning) =>
      warning
        .setColor('#ff0000')
        .addField(
          'TIP: ',
          'Edit your message as suggested to make this warning go away',
        )
        .addField(
          'Open Source Improvements: ',
          'EddieBot is Open Source, you can find it here https://github.com/EddieHubCommunity/EddieBot',
        ),
    );

    if (!warnings.length) {
      return;
    }

    await message.channel.send({ embeds: warnings.slice(0, 3) });
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
