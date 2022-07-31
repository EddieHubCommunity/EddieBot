import { EmbedBuilder, Message } from 'discord.js';
import { checkContent } from '../alexjs/checkContent';
import { checkBannedWords } from '../alexjs/checkBannedWords';
import { stripSpecialCharacters } from '../alexjs/stripSpecialCharacters';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import Warnings from '../database/models/Warnings';
import Statistics from '../database/models/Statistics';

export const onMessage = async (bot: ExtendedClient, message: Message) => {
  try {
    if (message.author.bot || !message.content || !message.guild) {
      return;
    }

    const triggeredWarnings: EmbedBuilder[] = [];
    const cleaned = stripSpecialCharacters(message.content);
    triggeredWarnings.push(
      ...(await checkContent(bot, cleaned, message.guild.id)),
    );
    triggeredWarnings.push(
      ...(await checkBannedWords(bot, cleaned, message.guild.id)),
    );

    triggeredWarnings.map((warning) =>
      warning.setColor('#ff0000').addFields([
        {
          name: 'TIP: ',
          value: 'Edit your message as suggested to make this warning go away',
        },
        {
          name: 'Open Source Improvements: ',
          value:
            'EddieBot is Open Source, you can find it here https://github.com/EddieHubCommunity/EddieBot',
        },
      ]),
    );

    if (!triggeredWarnings.length) {
      return;
    }

    const sent = await message.channel.send({
      embeds: triggeredWarnings.slice(0, 1),
    });
    await Warnings.create({
      serverId: message.guild.id,
      messageId: message.id,
      channelId: message.channel.id,
      warningId: sent.id,
    });

    await Statistics.findOneAndUpdate(
      {
        serverId: message.guild.id,
      },
      { $inc: { totalTriggers: 1 } },
      { upsert: true },
    ).exec();
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
