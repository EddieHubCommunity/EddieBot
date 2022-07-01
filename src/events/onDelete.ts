import { Message, PartialMessage } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import Warnings from '../database/models/Warnings';

export const onDelete = async (
  bot: ExtendedClient,
  message: Message | PartialMessage,
) => {
  if (message.partial) {
    try {
      message = await message.fetch();
    } catch (error) {
      return await errorHandler(bot, error, 'fetching partial message');
    }
  }

  if (message.author.bot || !message.content || !message.guild) {
    return;
  }

  try {
    const savedWarning = await Warnings.findOne({
      serverId: message.guild.id,
      messageId: message.id,
      channelId: message.channel.id,
    });

    if (savedWarning) {
      const notificationMessage = await message.channel.messages.fetch(
        savedWarning.notificationId, // TODO: Bug
      );
      if (notificationMessage) {
        await notificationMessage.delete();
        return;
      }
    }

    return;
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
