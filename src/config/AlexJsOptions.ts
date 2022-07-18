import { Config } from 'alex';

export const AlexJsOptions: {
  allowedWords: string[];
  alexWhitelist: Config;
} = {
  // words we allow even if AlexJS blocks (words are sometimes grouped by we want to be more granular)
  allowedWords: ['fellow'],
  alexWhitelist: {
    profanitySureness: 1,
    noBinary: true,
    // AlexJS to ignore these grouped words https://github.com/retextjs/retext-equality/blob/main/rules.md
    allow: [
      'add',
      'basically',
      'clearly',
      'dad-mom',
      'daft',
      'fellow',
      'fellowship',
      'gimp',
      'hero-heroine',
      'host-hostess',
      'hostesses-hosts',
      'husband-wife',
      'jesus',
      'king',
      'kushi',
      'latino',
      'long-time-no-see',
      'master',
      'moan',
      'moaning',
      'obvious',
      'of-course',
      'postman-postwoman',
      'special',
      'superman-superwoman',
      'simple',
      'just',
      'nephew-niece',
      'nephews-nieces',
    ],
  },
};
