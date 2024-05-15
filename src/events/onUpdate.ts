import { EmbedBuilder, Message, PartialMessage } from 'discord.js';
import { checkContent } from '../alexjs/checkContent';
import { checkBannedWords } from '../alexjs/checkBannedWords';
import { stripSpecialCharacters } from '../alexjs/stripSpecialCharacters';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import Warnings from '../database/models/Warnings';
import Statistics from '../database/models/Statistics';
import { sentenceTypoFixer } from '../utils/typoFixer';
import { checkLinks } from '../links/checkLinks';

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

  await checkLinks(bot, newMessage);

  // log to admin channel updates
  const oldContent = oldMessage.content;
  const newContent = newMessage.content;

  if (oldContent !== newContent) {
    const logChannel = bot.channels.cache.get(process.env.ADMIN_CHANNEL!);
    if (logChannel && logChannel.isTextBased()) {
      const logEmbed = new EmbedBuilder()
        .setTitle(`Message Updated by "${newMessage.author?.username}"`)
        .setDescription(`Message updated in ${newMessage.channel} channel`)
        .addFields(
          {
            name: 'Old Message',
            value: oldContent ?? 'No old message available',
          },
          {
            name: 'New Message',
            value: newContent ?? 'No new message available',
          },
          { name: 'Author', value: newMessage.author.toString() },
          { name: 'Channel', value: newMessage.channel.toString() },
        )
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] });
    }
  }

  try {
    const triggeredWarnings: EmbedBuilder[] = [];
    const cleaned = await sentenceTypoFixer(
      stripSpecialCharacters(newMessage.content),
    );
    triggeredWarnings.push(
      ...(await checkContent(bot, cleaned, newMessage.guild.id)),
    );
    triggeredWarnings.push(
      ...(await checkBannedWords(bot, cleaned, newMessage.guild.id)),
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
