import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';

export const serverinfo: Command = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Display information about the community.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const embed = new EmbedBuilder();
      embed.setTitle('EddieHub Community!!!');
      embed.setDescription(
        'Collaboration 1st, Code 2nd!',
      );
      embed.addFields([
        {
          name: 'Steps to get started',
          value:
            ':point_down::skin-tone-1:',
        },
        {
          name: 'Join GitHub Org.',
          value:
            "Join the EddieHub GitHub Org by raising an [issue](https://github.com/EddieHubCommunity/support/issues/new?assignees=&labels=invite+me+to+the+organisation&template=invitation.yml&title=Please+invite+me+to+the+GitHub+Community+Organization) (you will receive an invitation)",
        },
        {
          name: 'Create a LinkFree profile',
          value:
            "Get more GREEN squares by adding your profile to our [LinkFree](https://github.com/EddieHubCommunity/LinkFree) (Open Source alternative to LinkTree) for your custom EddieHub url",
        },
        {
          name: 'Show Swag!',
          value:
            `Append your Discord/Twitter username with "EddieHub" (for example "Eddie Jaoude | EddieHub")`,
        },
      ]);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'help command');
    }
  },
};
