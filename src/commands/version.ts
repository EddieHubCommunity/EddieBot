import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import type { Command } from '../interfaces/Command.js';
import { errorHandler } from '../utils/errorHandler.js';

export const version: Command = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Display version info about our bot.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle('Introducing EddieBot!!!');
      embed.setDescription(`Currently running version ${process.env.VERSION}`);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'version command');
    }
  },
};
