import { describe, expect, test } from '@jest/globals';
import { sentenceTypoFixer } from '../typoFixer';
describe('TypoFixer module tests', () => {
  test('Should replace the words with issues.', async () => {
    // given
    const expectedOutput = 'Hello King King new';
    const inputWord = 'Hello Kking K?king new';

    // when
    const output = await sentenceTypoFixer(inputWord);

    // then
    expect(output).toBe(expectedOutput);
  });

  test('Should leave sentence in the same condition.', async () => {
    // given
    const expectedOutput = 'Hello King King new';
    const inputWord = 'Hello King King new';

    // when
    const output = await sentenceTypoFixer(inputWord);

    // then
    expect(output).toBe(expectedOutput);
  });

  test('Should replace FFoo by Foo', async () => {
    // given
    const expectedOutput = 'Foo';
    const inputWord = 'Ffoo';

    // when
    const output = await sentenceTypoFixer(inputWord);

    // then
    expect(output).toBe(expectedOutput);
  });

  test('Should not replace picking', async () => {
    // given
    const expectedOutput = 'picking';
    const inputWord = 'picking';

    // when
    const output = await sentenceTypoFixer(inputWord);

    // then
    expect(output).toBe(expectedOutput);
  });
});
