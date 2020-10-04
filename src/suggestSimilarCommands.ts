import commandList from './commandHandlers';

// @ts-ignore
import * as soundex from 'soundex-code';

const maxLength = 2;
const map = new Map();
commandList
  .forEach((commandItem) => map.set(commandItem, soundex(commandItem.triggers[0], maxLength)));

const reverseMap = new Map();
for (const [key, value] of map.entries()) {
  const previous = reverseMap.get(value) || [];
  previous.push(key);
  reverseMap.set(value, previous);
}

export const suggestSimilarCommands = (command: string) => {
  return reverseMap.get(soundex(command, maxLength));
};
