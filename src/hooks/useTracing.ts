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
}

export function useTracing({ category, mode, initialCase }: UseTracingOptions) {
  const [letterCase, setLetterCase] = useState<LetterCase>(initialCase);
  const [clearTrigger, setClearTrigger] = useState(0);

  // Initialize with first character or random
  const getInitialCharacter = useCallback(() => {
    if (mode === 'random') {
      return getRandomCharacter(category, initialCase);
    }
    return getCharacters(category, initialCase)[0];
  }, [category, mode, initialCase]);

  const [currentCharacter, setCurrentCharacter] = useState(getInitialCharacter);

  const handleNext = useCallback(() => {
    if (mode === 'random') {
      setCurrentCharacter((prev) => getRandomCharacter(category, letterCase, prev));
    } else {
      setCurrentCharacter((prev) => getNextCharacter(prev, category, letterCase));
    }
    setClearTrigger((t) => t + 1);
  }, [category, mode, letterCase]);

  const handleClear = useCallback(() => {
    setClearTrigger((t) => t + 1);
  }, []);

  const handleToggleCase = useCallback(() => {
    setLetterCase((prev) => {
      const newCase = prev === 'uppercase' ? 'lowercase' : 'uppercase';
      // Update character to match new case
      setCurrentCharacter((char) =>
        newCase === 'uppercase' ? char.toUpperCase() : char.toLowerCase()
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
