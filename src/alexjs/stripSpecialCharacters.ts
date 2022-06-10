export const stripSpecialCharacters = (str: string): string => {
  // alexMatch special symbols and replace with ' '
  str = str.replace(/[.,/\\#!$%?&*;:{}=\-_'"“”~()]/g, ' ');
  // alexMatch double whitespace with single space for cleaner string
  return str.replace(/\s{2,}/g, ' ');
};
