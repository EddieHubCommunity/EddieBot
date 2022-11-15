import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { errorHandler } from '../utils/errorHandler';

export const serverinfo: Command = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Display information about EddieHubCommunity.'),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      
      const botMembers = await message.guild!.members.fetch().then(totalMembers => totalMembers.filter(m => m.user.bot))
      const userMembers = await message.guild!.members.fetch().then(totalMembers => totalMembers.filter(m => !m.user.bot))

      const embed = new EmbedBuilder();
      embed.setTitle('EddieHubCommunity');
      embed.setDescription(
        'Open Source community aimed at encouraging and promoting communication, best practices and technical expertise in an inclusive and welcoming environment.',
      );
      embed.addFields([
        {
          name: 'Member Count:',
          value:
            'We have Total: ${botMembers.size + userMembers.size}\nUsers: ${userMembers.size}\nBots: ${botMembers.size}`
            members in the community! ',
        },
        {
          name: 'How do I help with new features?',
          value:
            "We are completely open source - you can check out [the bot's repository](https://github.com/EddieHubCommunity/EddieBot) to see what issues are available for contribution.",
        },
      ]);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, 'serverinfo command');
    }
  },
};
