import { MessageEmbed } from 'discord.js';

export default {
  alexWhitelist: {
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
      'superman-superwoman',
      'hero-heroine',
      'moan',
      'latino',
      'postman-postwoman',
      'hostesses-hosts',
      'gimp',
    ],
  },

  defaultEmbed: (color = '#0099ff') => {
    return new MessageEmbed().setColor(color);
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
