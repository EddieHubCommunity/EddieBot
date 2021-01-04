## How to add allowed word

All the allowed words are located in an array in [src/config.ts](src/config.ts) inside the object ` ALEX ` as shown below. 

```ts
ALEX: {
    profanitySureness: 2,
    noBinary: true,
    allow: [
      'just',
      'brother-sister',
      'brothers-sisters',
      'daft',
      ...
    ]
}
```
In order to add a new allowed word you have to do it inside of single quotes (` '' `) and for phrases (multiple words togheter) you should put a hiphon (` - `).

It must match **the following rules**: 
- [Rules for profanities](https://github.com/retextjs/retext-profanities/blob/main/rules.md)
- [Rules for equality](https://github.com/retextjs/retext-equality/blob/main/rules.md)
