import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';
import Statistics from '../database/models/Statistics';

export const stats: Command = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Display stats info about our bot.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      // TODO: We will need to set up pagination at some point or this will be too much to fit in one embed.
      const stats = await Statistics.find({});

      const embed = new EmbedBuilder();
      embed.setTitle('Statistics about EddieBot');

      embed.setDescription(`Total servers: ${stats.length}`);

      embed.addFields(
        stats.map((stat) => ({
          name: stat.serverId,
          value: `Total triggers: ${stat.totalTriggers} and total triggers fixed: ${stat.totalTriggersFixed}`,
        })),
      );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'version command');
    }
  },
};
