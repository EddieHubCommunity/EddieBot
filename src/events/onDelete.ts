import { Message, PartialMessage } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';
import Warnings from '../database/models/Warnings';

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
      await savedWarning.remove();
      return;
    }

    return;
  } catch (error) {
    await errorHandler(bot, error, 'on message');
  }
};
