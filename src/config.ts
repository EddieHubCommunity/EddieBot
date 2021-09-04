import { MessageEmbed } from 'discord.js';

export default {
  // words we block in addition to AlexJS
  // please check words are not already covered by AlexJS and the libraries it uses first
  // http://alexjs.com
  preventWords: [
    'guyz',
    'guyzz',
    'bruh',
    'duude',
    'women',
    'sir',
    'sirr',
    'man',
    'fellas',
    'madam',
    'maam',
    "ma'am",
    'yessir',
    'chad',
    'simp',
  ],
  // words we allow even if AlexJS blocks (words are sometimes grouped by we want to be more granular)
  allowedWords: ['fellow'],
  alexWhitelist: {
    profanitySureness: 1,
    noBinary: true,
    // AlexJS to ignore these grouped words https://github.com/retextjs/retext-equality/blob/main/rules.md
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
      'simple',
      'just',
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
