import { AxiosRequestConfig } from 'axios';
import { MessageEmbed } from 'discord.js';
import * as dotenv from 'dotenv';

// Use dotenv to find system variables or a .env file.
dotenv.config();

export default {
  BIO: [
    'description',
    'github',
    'twitter',
    'youtube',
    'instagram',
    'linkedin',
    'location',
    'timezone',
    'delete',
  ],
  COMMAND_PREFIX: process.env.COMMAND_PREFIX || '$',
  COOLDOWN_SECONDS: 2,
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID,
  REACTIONS_COUNT: 5,
  ROLE: {
    HIGH_VALUE: {
      name: 'high value',
      description:
        'Members with this role have access to more commands to moderate the server (e.g. ban). You get assigned this role if you have a message with +5 reactions',
    },
    BIO: {
      name: 'bio',
      description:
        'You get assigned this role once you set a biography with the "bio" command',
    },
    OPEN_SOURCE: {
      name: 'opensource',
      description:
        'You can assign this role to yourself to subscribe to get open-source reminders and if you like contributing to open-source software',
    },
  },
  defaultEmbed: () => {
    return new MessageEmbed()
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter(
        'Our bot is Open Source, you can find it here https://github.com/EddieJaoudeCommunity/EddieBot'
      );
  },
  TIMEZONES: [
    //AMERICA

    { abbr: 'SST', zone: 'Pacific/midway' },
    // UTC-11(samoa standard time) -- If conflicts, use America/Pago_pago
    { abbr: 'HST', zone: 'Pacific/Honolulu' },
    // UTC - 10(Hawaii–Aleutian Standad Time Zone)
    { abbr: 'HDT', zone: 'America/Adak' },
    // UTC - 9(Hawaii–Aleutian Daylight Saving Time)
    { abbr: 'AKDT', zone: 'America/Anchorage' },
    // UTC - 8(Alaska Daylight Time)
    { abbr: 'PDT', zone: 'America/Los_Angeles' },
    // UTC - 7(Pacific Daylight Time)
    { abbr: 'MST', zone: 'America/Creston' },
    // UTC - 7(Mountain Standard Time)
    { abbr: 'MDT', zone: 'America/Denver' },
    // UTC - 6(Mountain Daylight Time)
    { abbr: 'CST', zone: 'America/Regina' },
    // UTC - 6(Central Standard Time)
    { abbr: 'CDT', zone: 'America/Denver' },
    // UTC - 5(Central Daylight Time)
    { abbr: 'EST', zone: 'America/Panama' },
    // UTC - 5(Eastern Standard TIme)
    { abbr: 'EDT', zone: 'America/Detroit' },
    // UTC - 4(Eastern Daylight Time)
    { abbr: 'AST', zone: 'America/Curacao' },
    // UTC - 4(Atlantic Standard Time)
    { abbr: 'ADT', zone: 'America/Halifax' },
    // UTC - 3(Atlantic Daylight Time)

    // Europe

    { abbr: 'UTC', zone: 'Europe/London' },
    { abbr: 'UK', zone: 'Europe/London' },
    { abbr: 'CEST', zone: 'Europe/Stockholm' },
    // winter timezone of Finland +1h
    { abbr: 'EET', zone: 'Europe/Finland' },
    // summer timezone of Finland -1h
    { abbr: 'EEST', zone: 'Europe/Finland' },

    // AUSTRALIA

    { abbr: 'AEST', zone: 'Australia/Brisbane' },
    // AEST- UTC + 10 (Australian Eastern Standard Time)
    { abbr: 'AEDT', zone: 'Australia/Melbourne' },
    // AEDT- UTC + 11 (Australian Eastern Daylight Time)
    { abbr: 'ACDT', zone: 'Australia/Adelaide' },
    // ACDT- UTC + 10:30 (Australian Central Daylight Time)
    { abbr: 'ACST', zone: 'Australia/Darwin' },
    // ACST- UTC + 9:30 (Australian Central Standard Time)
    { abbr: 'AWST', zone: 'Australia/Perth' },
    // AWST- UTC + 8 (Australian Western Standard Time)

    // Asia

    { abbr: 'IST', zone: 'Asia/Kolkata' },
    { abbr: 'EEST', zone: 'Asia/Beirut' },
  ],

  OPENSOURCE_JOB_CRON_TIME:
    process.env.OPENSOURCE_JOB_CRON_TIME || '0 14 * * *', // Default time is everyday at 2pm
  TIPS: {
    directory: './tips',
    tips: ['openSourceTips.md', 'githubTips.md'],
    resources: ['openSourceResources.md'],
  },
  WORDS: {
    prepend: [
      'hello',
      'hey',
      'hi',
      'yo',
      'hiya',
      'whatsup',
      'greetings',
      'bye',
      'seeya',
      'goodbye',
      'good bye',
      'thanks',
      'whatsup',
      'look',
      'you',
    ],
    append: ['.', '?', '!', ';', ':'],
    checks: [
      {
        check: 'guys',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'bros',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'bro',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'man',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'dude',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'dudes',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'gentlemen',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'fella',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'fellas',
        suggestions: ['folks', 'people', 'everyone'],
      },
      {
        check: 'boys',
        suggestions: ['folks', 'people', 'everyone'],
      },
    ],
  },
};

// Possible values for user subscriptions
export enum UserSubscriptions {
  OPEN_SOURCE = 'OPENSOURCE',
}

export const selfAssignableRoles = [
  'php',
  'laravel',
  'javascript',
  'angular',
  'react',
  'vue',
  'java',
  'ruby',
  'python',
  'ops',
  'fullstack',
  'flutter',
  'typescript',
  'opensource',
];

export const issueRequestConfig: AxiosRequestConfig = {
  url: `https://api.github.com/search/repositories`,
};

if (process.env.GITHUB_TOKEN) {
  issueRequestConfig.headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  };
}
