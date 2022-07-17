import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';
import Statistics, {
  Statistics as StatsType,
} from '../database/models/Statistics';

export const stats: Command = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Display stats info about our bot.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      const stats = await Statistics.find({});

      const embed = new MessageEmbed();
      embed.setTitle('Statistics about EddieBot');

      embed.setDescription(`Total servers: ${stats.length}`);

      stats.forEach((stat: StatsType) =>
        embed.addField(
          `${stat.serverId}`,
          `Total triggers: ${stat.totalTriggers} and total triggers fixed: ${stat.totalTriggersFixed}`,
        ),
      );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'version command');
    }
  },
};
