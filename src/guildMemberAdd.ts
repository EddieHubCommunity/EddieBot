import { GuildMember, PartialGuildMember } from 'discord.js';

import config from './config';
import { log } from './logger';

const { INTRO_CHANNEL } = config;

export const guildMemberAdd = async (
  member: GuildMember | PartialGuildMember
) => {
  if (member.partial) {
    try {
      await member.fetch();
    } catch (error) {
      log.error('Something went wrong when fetching the message: ', error);
      return;
    }
  }

  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === INTRO_CHANNEL && ch.type === 'text'
  );

  if (!channel) {
    log.error(`${INTRO_CHANNEL} not found`);
    return;
  }

  // console.log(channel)
  // channel.send(`Welcome to the server, ${member}`);
};
