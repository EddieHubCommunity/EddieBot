import type { Message, PartialMessage } from 'discord.js';
import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { errorHandler } from '../utils/errorHandler.js';
import Warnings from '../database/models/Warnings.js';
import Statistics from '../database/models/Statistics.js';

export const onDelete = async (
  bot: ExtendedClient,
  message: Message | PartialMessage,
) => {
  try {
    const savedWarning = await Warnings.findOne({
      serverId: message.guildId,
      messageId: message.id,
      channelId: message.channelId,
    });

    if (savedWarning) {
      const notificationMessage = await message.channel.messages.fetch(
        savedWarning.warningId,
      );

      if (notificationMessage) {
        await notificationMessage.delete();
      }
      await savedWarning.deleteOne();

      await Statistics.findOneAndUpdate(
        {
          serverId: message.guildId,
        },
        { $inc: { totalTriggersFixed: 1 } },
        { upsert: true },
      ).exec();
      return;
    }

    return;
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
