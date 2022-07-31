import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from './errorHandler';
import { logHandler } from './logHandler';

/**
 * TODO: We want to be able to run this via a text command rather than on load.
 */
export const registerCommands = async (bot: ExtendedClient) => {
  try {
    if (!bot.user?.id) {
      logHandler.log(
        'error',
        'Cannot register commands as bot has not authenticated to Discord.',
      );
      return;
    }
    const rest = new REST({ version: '10' }).setToken(bot.config.token);
    const commandData = bot.commands.map((command) => command.data.toJSON());

    if (!commandData.length) {
      logHandler.log('warn', 'No commands found to register.');
      return;
    }

    if (process.env.NODE_ENV === 'production') {
      logHandler.log('info', 'Registering commands globally');
      await rest.put(Routes.applicationCommands(bot.user.id), {
        body: commandData,
      });
    } else {
      logHandler.log('info', 'Registering to home guild only!');
      await rest.put(
        Routes.applicationGuildCommands(bot.user.id, bot.config.homeGuild),
        { body: commandData },
      );
    }
  } catch (err) {
    await errorHandler(bot, err, 'register commands');
  }
};
