import commandList, { CommandHandler } from './commandHandlers';

import soundex from 'soundex-code';
/**
 * function soundex(value: string, maxLength?: number): string
 * returns a hash string of maxLength size
 * of the string value passed to it, s.t.
 * similar values result in equal hashes
 */

// this map contains the soundex value for each command
const commandToSoundexMap = new Map<CommandHandler, string>();
const maxLength = 2; // stores the length of hashes
commandList
  .forEach((commandItem) => commandToSoundexMap.set(commandItem, soundex(commandItem.triggers[0], maxLength)));

// this map contains the list of commands for a given soundex key
const soundexToSimilarCommandsListMap = new Map<string, CommandHandler[]>();
for (const [key, value] of commandToSoundexMap.entries()) {
  const previousSimilarCommandsList = soundexToSimilarCommandsListMap.get(value) || [];
  previousSimilarCommandsList.push(key);
  soundexToSimilarCommandsListMap.set(value, previousSimilarCommandsList);
}

// returns a list of similar commands
export const suggestSimilarCommands = (command: string) => {
  return soundexToSimilarCommandsListMap.get(soundex(command, maxLength));
};
