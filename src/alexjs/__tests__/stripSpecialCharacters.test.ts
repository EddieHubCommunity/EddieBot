import { describe, expect, test } from '@jest/globals';
import { stripSpecialCharacters } from '../stripSpecialCharacters.js';
describe('Strip special characters module tests', () => {
  test('Should remove special characters from words.', async () => {
    // given
    const expectedOutput = 'K ing';
    const inputWord = 'K?ing';

    // when
    const strippedOutput = stripSpecialCharacters(inputWord);

    // then
    expect(strippedOutput).toBe(expectedOutput);
  });
});
