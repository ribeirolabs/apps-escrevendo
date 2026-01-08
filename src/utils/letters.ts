export const ALPHABET_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const ALPHABET_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const NUMBERS = '0123456789'.split('');

export type LetterCase = 'uppercase' | 'lowercase' | 'both';
export type Mode = 'sequence' | 'random';
export type Category = 'letters' | 'numbers';

export function getCharacters(category: Category, letterCase: LetterCase): string[] {
  if (category === 'numbers') {
    return NUMBERS;
  }
  if (letterCase === 'both') {
    return ALPHABET_UPPERCASE; // We use uppercase as the base, will show both in UI
  }
  return letterCase === 'uppercase' ? ALPHABET_UPPERCASE : ALPHABET_LOWERCASE;
}

export function getRandomCharacter(
  category: Category,
  letterCase: LetterCase,
  excludeCharacter?: string
): string {
  const characters = getCharacters(category, letterCase);
  
  // If we have a character to exclude and there's more than one option
  if (excludeCharacter && characters.length > 1) {
    const filtered = characters.filter(c => c !== excludeCharacter);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  
  return characters[Math.floor(Math.random() * characters.length)];
}

export function getNextCharacter(
  current: string,
  category: Category,
  letterCase: LetterCase
): string {
  const characters = getCharacters(category, letterCase);
  const currentIndex = characters.indexOf(current);
  const nextIndex = (currentIndex + 1) % characters.length;
  return characters[nextIndex];
}
