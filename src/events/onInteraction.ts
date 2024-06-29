import type { Interaction } from 'discord.js';
import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { errorHandler } from '../utils/errorHandler.js';

export const onInteraction = async (
  bot: ExtendedClient,
  interaction: Interaction,
) => {
  try {
    if (interaction.isChatInputCommand()) {
      for (const command of bot.commands) {
        if (command.data.name === interaction.commandName) {
          await command.run(bot, interaction);
          break;
        }
      }
    }
  } catch (err) {
    await errorHandler(bot, err, 'on interaction');
  }
};
