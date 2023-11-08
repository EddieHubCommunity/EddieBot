const Typo = require('typo-js-ts').Typo;

export const dict = new Typo('en_US', null, null, {
  dictionaryPath: 'src/typo/dict',
});
