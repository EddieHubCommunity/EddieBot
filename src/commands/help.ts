import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display information about our bot.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle('Introducing EddieBot!!!');
      embed.setDescription(
        'EddieBot is a bot designed to help you keep the language within your community safe and inclusive. We run on the AlexJS library with extensive options and custom modules to allow you to configure your servers allowed terminology.',
      );
      embed.addFields([
        {
          name: 'How do I configure my server?',
          value:
            'At this time, our bot is still in beta and we are working on the configuration feature.',
        },
        {
          name: 'How do I help with new features?',
          value:
            "We are completely open source - you can check out [the bot's repository](https://github.com/EddieHubCommunity/EddieBot) to see what issues are available for contribution.",
        },
      ]);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'help command');
    }
  },
};
