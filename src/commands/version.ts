import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';

export const version: Command = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Display version info about our bot.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const embed = new MessageEmbed();
      embed.setTitle('Introducing EddieBot!!!');
      embed.setDescription(`Currently running version ${process.env.VERSION}`);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'version command');
    }
  },
};
