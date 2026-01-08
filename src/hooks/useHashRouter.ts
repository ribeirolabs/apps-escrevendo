import { useState, useEffect, useCallback } from 'react';
import type { Category, Mode, LetterCase } from '../utils/letters';

export interface RouteState {
  screen: 'category' | 'mode' | 'tracing';
  category?: Category;
  mode?: Mode;
  letterCase?: LetterCase;
}

function parseHash(): RouteState {
  const hash = window.location.hash.slice(1); // Remove #
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) {
    return { screen: 'category' };
  }

  const category = parts[0] as Category;
  if (category !== 'letters' && category !== 'numbers') {
    return { screen: 'category' };
  }

  if (parts.length === 1) {
    return { screen: 'mode', category };
  }

  const mode = parts[1] as Mode;
  if (mode !== 'sequence' && mode !== 'random') {
    return { screen: 'mode', category };
  }

  // Optional letter case for letters
  let letterCase: LetterCase = 'uppercase';
  if (parts.length >= 3 && category === 'letters') {
    const caseParam = parts[2];
    if (caseParam === 'lowercase' || caseParam === 'uppercase' || caseParam === 'both') {
      letterCase = caseParam;
    }
  }

  return { screen: 'tracing', category, mode, letterCase };
}

function buildHash(state: RouteState): string {
  if (state.screen === 'category') {
    return '#/';
  }

  if (state.screen === 'mode' && state.category) {
    return `#/${state.category}`;
  }

  if (state.screen === 'tracing' && state.category && state.mode) {
    if (state.category === 'letters' && state.letterCase) {
      return `#/${state.category}/${state.mode}/${state.letterCase}`;
    }
    return `#/${state.category}/${state.mode}`;
  }

  return '#/';
}

export function useHashRouter() {
  const [state, setState] = useState<RouteState>(parseHash);

  // Listen for hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setState(parseHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate to a new state
  const navigate = useCallback((newState: RouteState) => {
    const hash = buildHash(newState);
    window.location.hash = hash;
    setState(newState);
  }, []);

  // Helper navigation functions
  const goToCategory = useCallback(() => {
    navigate({ screen: 'category' });
  }, [navigate]);

  const goToMode = useCallback((category: Category) => {
    navigate({ screen: 'mode', category });
  }, [navigate]);

  const goToTracing = useCallback((category: Category, mode: Mode, letterCase: LetterCase = 'uppercase') => {
    navigate({ screen: 'tracing', category, mode, letterCase });
  }, [navigate]);

  // Update letter case in URL without full navigation
  const updateLetterCase = useCallback((newLetterCase: LetterCase) => {
    setState((currentState) => {
      if (currentState.screen === 'tracing' && currentState.category === 'letters') {
        const newState = { ...currentState, letterCase: newLetterCase };
        const hash = buildHash(newState);
        window.history.replaceState(null, '', hash);
        return newState;
      }
      return currentState;
    });
  }, []);

  return {
    ...state,
    navigate,
    goToCategory,
    goToMode,
    goToTracing,
    updateLetterCase,
  };
}
