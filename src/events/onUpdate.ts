import { Message, PartialMessage } from 'discord.js';
import { checkContent } from '../alexjs/checkContent';
import { checkBannedWords } from '../alexjs/checkBannedWords';
import { stripSpecialCharacters } from '../alexjs/stripSpecialCharacters';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import Warnings from '../database/models/Warnings';
import Statistics from '../database/models/Statistics';

export const onUpdate = async (
  bot: ExtendedClient,
  oldMessage: Message | PartialMessage,
  newMessage: Message | PartialMessage,
) => {
  if (newMessage.partial) {
    try {
      newMessage = await newMessage.fetch();
    } catch (error) {
      return await errorHandler(bot, error, 'fetching partial message');
    }
  }

  if (newMessage.author.bot || !newMessage.content || !newMessage.guild) {
    return;
  }

  try {
    const triggeredWarnings = [];
    const cleaned = stripSpecialCharacters(newMessage.content);
    triggeredWarnings.push(
      ...(await checkContent(bot, cleaned, newMessage.guild.id)),
    );
    triggeredWarnings.push(
      ...(await checkBannedWords(bot, cleaned, newMessage.guild.id)),
    );

    triggeredWarnings.map((warning) =>
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

    const savedWarning = await Warnings.findOne({
      serverId: newMessage.guild.id,
      messageId: newMessage.id,
      channelId: newMessage.channel.id,
    });

    // when edit results in new warning, but no existing warning
    if (!savedWarning && triggeredWarnings.length) {
      const sent = await newMessage.channel.send({
        embeds: triggeredWarnings.slice(0, 1),
      });
      await Warnings.create({
        serverId: newMessage.guild.id,
        messageId: newMessage.id,
        channelId: newMessage.channel.id,
        warningId: sent.id,
      });

      await Statistics.findOneAndUpdate(
        {
          serverId: newMessage.guild.id,
        },
        { $inc: { totalTriggers: 1 } },
        { upsert: true },
      ).exec();
    }

    // when edit results in no new warning, but has existing warning, so fixed
    if (savedWarning && !triggeredWarnings.length) {
      const notificationMessage = await newMessage.channel.messages.fetch(
        savedWarning.warningId,
      );
      if (notificationMessage) {
        await notificationMessage.delete();
      }
      await savedWarning.remove();

      await Statistics.findOneAndUpdate(
        {
          serverId: newMessage.guild.id,
        },
        { $inc: { totalTriggersFixed: 1 } },
        { upsert: true },
      ).exec();
      return;
    }

    // when edit results in new warning AND has existing warning
    if (savedWarning && triggeredWarnings.length) {
      const notificationMessage = await newMessage.channel.messages.fetch(
        savedWarning.warningId,
      );
      if (notificationMessage) {
        await notificationMessage.edit({ embeds: [triggeredWarnings[0]] });
        return;
      }

      await Statistics.findOneAndUpdate(
        {
          serverId: newMessage.guild.id,
        },
        { $inc: { totalTriggers: 1 } },
        { upsert: true },
      ).exec();
    }

    // when edit results in no new and no old
    return;
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
