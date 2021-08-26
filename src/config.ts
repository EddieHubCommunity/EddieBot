import { MessageEmbed } from 'discord.js';

export default {
  preventWords: ['guyz', 'guyzz', 'bruh', 'duude', 'women', 'sir', 'man'],
  alexWhitelist: {
    profanitySureness: 1,
    noBinary: true,
    allow: [
      'add',
      'basically',
      'clearly',
      'dad-mom',
      'daft',
      'fellow',
      'fellowship',
      'gimp',
      'hero-heroine',
      'host-hostess',
      'hostesses-hosts',
      'husband-wife',
      'jesus',
      'king',
      'kushi',
      'latino',
      'long-time-no-see',
      'master',
      'moan',
      'moaning',
      'obvious',
      'of-course',
      'postman-postwoman',
      'special',
      'superman-superwoman',
    ],
  },

  defaultEmbed: (color = '#0099ff') => {
    return new MessageEmbed()
      .setColor(color)
      .setFooter(
        'Our bot is Open Source, you can find it here https://github.com/EddieHubCommunity/EddieBot',
      );
  },
  colors: {
    message: '#0099ff',
    alerts: '#e84118',
    system: '#4cd137',
    github: '#6f7c7d',
    users: '#ffc200',
    help: '#4b2c5e',
  },
};
