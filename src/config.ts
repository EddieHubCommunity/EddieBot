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
        'You get assigned the High Value role if you have a message with +5 reactions',
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
    COMMUNITY_CHAT: {
      name: 'community chat',
      description:
        'You can assign this role to yourself to be pinged when we open a voice chat for an impromptu community session.',
    },
    AMONG_US: {
      name: 'among us',
      description:
        'You can assign this role to yourself to be pinged when nhcarrigan (or another Admin) runs an Among Us session.',
    },
    BATTLESNAKE: {
      name: 'battlesnake',
      description:
        "You can assign this role to yourself to be pinged when there are updates regarding community battlesnake games or Eddie' video for battlesnake",
    },
  },
  COLORS: {
    message: '#0099ff',
    alerts: '#e84118',
    system: '#4cd137',
    github: '#6f7c7d',
    users: '#ffc200',
    help: '#4b2c5e',
  },
  defaultEmbed: (color = '#0099ff') => {
    return new MessageEmbed()
      .setColor(color)
      .setTimestamp()
      .setFooter(
        'Our bot is Open Source, you can find it here https://github.com/EddieJaoudeCommunity/EddieBot'
      );
  },
  TIMEZONES: [
    //AMERICA

    { abbr: 'PDT', zone: 'America/Los_Angeles' },
    { abbr: 'MST', zone: 'America/Creston' },
    { abbr: 'EST', zone: 'America/Panama' },
    { abbr: 'ADT', zone: 'America/Halifax' },

    { abbr: 'UTC', zone: 'Europe/London' },
    { abbr: 'UK', zone: 'Europe/London' },
    { abbr: 'CEST', zone: 'Europe/Stockholm' },
    { abbr: 'EET', zone: 'Europe/Finland' },

    { abbr: 'AEST', zone: 'Australia/Brisbane' },
    { abbr: 'ACDT', zone: 'Australia/Adelaide' },
    { abbr: 'AWST', zone: 'Australia/Perth' },

    { abbr: 'KST', zone: 'Asia/Seoul' },
    { abbr: 'IST', zone: 'Asia/Kolkata' },
  ],

  OPENSOURCE_JOB_CRON_TIME:
    process.env.OPENSOURCE_JOB_CRON_TIME || '0 14 * * *', // Default time is everyday at 2pm
  TIPS: {
    directory: './tips',
    tips: ['openSourceTips.md', 'githubTips.md'],
    resources: ['openSourceResources.md'],
  },
  ALEX: {
    profanitySureness: 1,
    noBinary: true,
    allow: [
      'just',
      'brother-sister',
      'brothers-sisters',
      'daft',
      'easy',
      'master',
      'clearly',
      'moaning',
      'host-hostess',
      'husband-wife',
      'obvious',
      'simple',
      'of-course',
      'special',
      'dad-mom',
      'fellowship',
      'basically',
      'long-time-no-see',
      'moan',
      'latino',
      'postman-postwoman',
      'hostesses-hosts',
    ],
  },
};

// Possible values for user subscriptions
export enum UserSubscriptions {
  OPEN_SOURCE = 'OPENSOURCE',
}

export const selfAssignableRoles = [
  'among us',
  'angular',
  'c/++',
  'c#',
  'community chat',
  'fullstack',
  'flutter',
  'go',
  'java',
  'javascript',
  'kotlin',
  'laravel',
  'nim',
  'node',
  'opensource',
  'ops',
  'php',
  'python',
  'battlesnake',
  'react',
  'ruby',
  'svelte',
  'typescript',
  'vue',
];

export const issueRequestConfig: AxiosRequestConfig = {
  baseURL: `https://api.github.com/search/`,
};

if (process.env.GITHUB_TOKEN) {
  issueRequestConfig.headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  };
}
