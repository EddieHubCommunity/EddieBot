import { Injectable } from '@nestjs/common';
import { On } from 'discord-nestjs';
import { Message } from 'discord.js';
import { AlexService } from './alex.service';

interface Notifications {
  messageId: string;
  channelId: string;
  notificationId: string;
}

@Injectable()
export class AlexHandler {
  private savedNotifications: Notifications[] = [];

  constructor(private readonly alexService: AlexService) {}

  @On({ event: 'message' })
  async onMessage(message: Message) {
    if (message.author.bot) {
      return;
    }

    const notifications = this.alexService.check(message);

    if (notifications.length) {
      const sent = await message.channel.send(notifications[0]);
      this.savedNotifications.push({
        messageId: message.id,
        channelId: message.channel.id,
        notificationId: sent.id,
      });
    }

    return;
  }

  @On({ event: 'messageUpdate' })
  async onMessageUpdate(oldMessage: Message, newMessage: Message) {
    if (newMessage.author.bot) {
      return;
    }

    const notifications = this.alexService.check(newMessage);

    // get the notification from the array
    const targetNotification = this.savedNotifications.find(
      (el) =>
        el.messageId === newMessage.id &&
        el.channelId === newMessage.channel.id,
    );

    // when edit results in new notification, but not old
    if (!targetNotification && notifications.length) {
      const sent = await newMessage.channel.send(notifications[0]);
      this.savedNotifications.push({
        messageId: newMessage.id,
        channelId: newMessage.channel.id,
        notificationId: sent.id,
      });
      return;
    }

    // when edit results in no new notification, but yes old
    if (targetNotification && !notifications.length) {
      const notificationMessage = await newMessage.channel.messages.fetch(
        targetNotification.notificationId,
      );
      if (notificationMessage && notificationMessage.deletable) {
        await notificationMessage.delete();

        this.savedNotifications = this.savedNotifications.filter(
          (el) =>
            el.messageId !== newMessage.id ||
            el.channelId !== newMessage.channel.id,
        );

        return;
      }
    }

    // when edit results in new notification AND old notification
    if (targetNotification && notifications.length) {
      const notificationMessage = await newMessage.channel.messages.fetch(
        targetNotification.notificationId,
      );
      if (notificationMessage) {
        await notificationMessage.edit(notifications[0]);
        return;
      }
    }

    // when edit results in no new and no old
    return;
  }

  @On({ event: 'messageDelete' })
  async onMessageDelete(deletedMessage: Message) {
    const deletedNotification = this.savedNotifications.find(
      (message: Notifications) =>
        message.messageId === deletedMessage.id &&
        message.channelId === deletedMessage.channel.id,
    );
    if (deletedNotification) {
      this.savedNotifications = this.savedNotifications.filter(
        (notification: Notifications) =>
          notification.channelId !== deletedNotification.channelId &&
          notification.messageId !== deletedNotification.messageId,
      );

      const notificationMessage = await deletedMessage.channel.messages.fetch(
        deletedNotification.messageId,
      );

      if (notificationMessage && notificationMessage.deletable) {
        await notificationMessage.delete();
      }
    }

    return;
  }
}
