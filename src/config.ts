import { MessageEmbed } from 'discord.js';

export default {
  BIO: [ 'description', 'github', 'twitter', 'youtube', 'instagram', 'linkedin' ],
  COMMAND_PREFIX: process.env.COMMAND_PREFIX || '$',
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID,
  REACTIONS_COUNT: 5,
  ROLE: {
    HIGH_VALUE: 'high value',
    BIO: 'bio',
  },
  defaultEmbed: () => {
    return new MessageEmbed()
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter('Our bot is Open Source, you can find it here https://github.com/eddiejaoude/EddieBot');
  },
  TIMEZONES: [
    { abbr: 'PDT', zone: 'America/Los_Angeles' },
    { abbr: 'AEST', zone: 'Australia/Brisbane' },
    { abbr: 'EEST', zone: 'Asia/Beirut' },
    { abbr: 'UTC', zone: 'Europe/London' },
    { abbr: 'IST', zone: 'Asia/Kolkata' },
  ]
};

export const selfAssignableRoles = []
