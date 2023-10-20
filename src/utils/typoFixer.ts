import { dict } from '../config/DictionaryOptions';

export async function sentenceTypoFixer(sentence: string) {
  const sentenceWords = sentence.split(/\s+/);
  const updatedWords = await Promise.all(
    sentenceWords.map(transformAndTypoFixer),
  );
  return updatedWords.join(' ');
}
async function wordTypoFixer(word: string) {
  return dict.ready.then(() => {
    return dict.check(word) ? word : dict.suggest(word, 1).at(0);
  });
}

async function transformAndTypoFixer(word: string) {
  const cleanWord = word.replace(/[^a-zA-Z]/g, '');
  return await wordTypoFixer(cleanWord);
}
