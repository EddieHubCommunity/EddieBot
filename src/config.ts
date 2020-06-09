import { MessageEmbed } from 'discord.js';

export default {
  COMMAND_PREFIX: '$',
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL: '700340820162641962',
  REACTIONS_COUNT: 5,
  ROLE: {
    HIGH_VALUE: 'high value'
  },
  defaultEmbed: () => {
    return new MessageEmbed()
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter('Our bot is Open Source, you can find it here https://github.com/eddiejaoude/EddieBot');
  },
};
