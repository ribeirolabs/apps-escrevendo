import { useState, useCallback } from 'react';
import {
  getCharacters,
  getNextCharacter,
  getRandomCharacter,
} from '../utils/letters';
import type { Category, LetterCase, Mode } from '../utils/letters';

interface UseTracingOptions {
  category: Category;
  mode: Mode;
  initialCase: LetterCase;
  word?: string;
}

export function useTracing({ category, mode, initialCase, word }: UseTracingOptions) {
  const [letterCase, setLetterCase] = useState<LetterCase>(initialCase);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // For words, get characters from the word
  const wordCharacters = word ? word.split('') : [];

  // Initialize with first character or random
  const getInitialCharacter = useCallback(() => {
    if (category === 'words' && wordCharacters.length > 0) {
      return wordCharacters[0];
    }
    if (mode === 'random') {
      return getRandomCharacter(category, initialCase);
    }
    return getCharacters(category, initialCase)[0];
  }, [category, mode, initialCase, wordCharacters]);

  const [currentCharacter, setCurrentCharacter] = useState(getInitialCharacter);

  const handleNext = useCallback(() => {
    if (category === 'words' && wordCharacters.length > 0) {
      const nextIndex = (wordIndex + 1) % wordCharacters.length;
      setWordIndex(nextIndex);
      setCurrentCharacter(wordCharacters[nextIndex]);
    } else if (mode === 'random') {
      setCurrentCharacter((prev) => getRandomCharacter(category, letterCase, prev));
    } else {
      setCurrentCharacter((prev) => getNextCharacter(prev, category, letterCase));
    }
    setClearTrigger((t) => t + 1);
  }, [category, mode, letterCase, wordCharacters, wordIndex]);

  const handleClear = useCallback(() => {
    setClearTrigger((t) => t + 1);
  }, []);

  const handleToggleCase = useCallback(() => {
    setLetterCase((prev) => {
      // Cycle: uppercase -> lowercase -> both -> uppercase
      const newCase = prev === 'uppercase' ? 'lowercase' : prev === 'lowercase' ? 'both' : 'uppercase';
      // Update character to match new case (for 'both' we use uppercase as base)
      setCurrentCharacter((char) =>
        newCase === 'lowercase' ? char.toLowerCase() : char.toUpperCase()
      );
      return newCase;
    });
  }, []);

  return {
    currentCharacter,
    letterCase,
    clearTrigger,
    handleNext,
    handleClear,
    handleToggleCase,
  };
}
