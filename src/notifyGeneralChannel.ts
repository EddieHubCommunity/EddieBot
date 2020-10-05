import { DMChannel, GuildChannel, TextChannel } from 'discord.js';

import config from './config';
import { log } from './logger';

const { GENERAL_CHANNEL } = config;

export const notifyGeneralChannel = async (
  channel: DMChannel | GuildChannel
) => {
  // Note: When the bot sends DMS to members, this is triggered. So we ignore the notification
  if (channel instanceof DMChannel) {
    return;
  }

  const generalChannel = channel.client.channels.cache.find(
    (currentChannel) =>
      currentChannel.id === process.env.GENERAL_CHANNEL_ID ||
      (currentChannel instanceof TextChannel &&
        currentChannel.name === GENERAL_CHANNEL)
  );
  if (!generalChannel)
    return log.error(
      `${GENERAL_CHANNEL} channel not found. Make sure to setup GENERAL_CHANNEL_ID env variable.`
    );

  if (generalChannel instanceof TextChannel) {
    const message = `\:tada: A new channel was created! Check out the channel ${channel.toString()}`;
    return await generalChannel.send(message);
  }
};
