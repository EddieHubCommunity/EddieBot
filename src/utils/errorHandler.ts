import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { logHandler } from './logHandler';

export const errorHandler = async (
  bot: ExtendedClient,
  err: unknown,
  context: string,
) => {
  const error = err as Error;

  logHandler.log('error', `${context}: ${error.message}`);
  logHandler.log(
    'error',
    `Stack trace:\n${JSON.stringify(
      error.stack || { stack: 'not found' },
      null,
      2,
    )}`,
  );

  if (bot.config.debugHook) {
    const embed = new EmbedBuilder();
    embed.setTitle(`There was an error message in the ${context}!`);
    embed.setDescription(
      `\`\`\`\n${JSON.stringify(
        error.stack || { stack: 'not found' },
        null,
        2,
      )}\n\`\`\``,
    );
    embed.addFields([{ name: `Error message`, value: error.message }]);

    await bot.config.debugHook.send({ embeds: [embed] });
  }
};
