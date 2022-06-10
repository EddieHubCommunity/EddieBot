import { readdir } from 'fs/promises';
import { join } from 'path';
import { Command } from '../interfaces/Command';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from './errorHandler';

export const loadCommands = async (bot: ExtendedClient): Promise<Command[]> => {
  try {
    const result: Command[] = [];
    const files = await readdir(
      join(process.cwd(), 'prod', 'commands'),
      'utf-8',
    );
    for (const file of files) {
      const name = file.split('.')[0];
      const command = await import(
        join(process.cwd(), 'prod', 'commands', file)
      );
      result.push(command[name] as Command);
    }
    return result;
  } catch (err) {
    await errorHandler(bot, err, 'command loader');
    return [];
  }
};
