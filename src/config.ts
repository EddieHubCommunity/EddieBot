import { MessageEmbed } from 'discord.js';

export default {
  BIO: [ 'description', 'github', 'twitter', 'youtube', 'instagram', 'linkedin', 'location' ],
  COMMAND_PREFIX: process.env.COMMAND_PREFIX || '$',
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID,
  REACTIONS_COUNT: 5,
  ROLE: {
    HIGH_VALUE:  {
      name: 'high value',
      description: 'Members with this role have access to more commands to moderate the server (e.g. ban). You get assigned this role if you have a message with +5 reactions'
    },
    BIO:{
      name: 'bio',
      description: 'You get assigned this role once you set a biography with the "bio" command'
    }
  },
  defaultEmbed: () => {
    return new MessageEmbed()
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter('Our bot is Open Source, you can find it here https://github.com/EddieJaoudeCommunity/EddieBot');
  },
  TIMEZONES: [
    { abbr: 'PDT', zone: 'America/Los_Angeles' },
    { abbr: 'AEST', zone: 'Australia/Brisbane' },
    { abbr: 'EEST', zone: 'Asia/Beirut' },
    { abbr: 'UTC', zone: 'Europe/London' }, { abbr: 'UK', zone: 'Europe/London' },
    { abbr: 'IST', zone: 'Asia/Kolkata' },
  ]
};

export const selfAssignableRoles = [
  'php', 'laravel',
  'javascript', 'angular', 'react', 'vue',
  'java',
  'ruby',
  'python',
  'ops',
  'fullstack',
  'flutter',
  'typescript',
];
