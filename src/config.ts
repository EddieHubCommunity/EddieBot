import { MessageEmbed } from 'discord.js';

export default {
  BIO: [ 'description', 'github', 'twitter', 'youtube', 'instagram', 'linkedin' ],
  COMMAND_PREFIX: process.env.COMMAND_PREFIX || '$',
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID,
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
