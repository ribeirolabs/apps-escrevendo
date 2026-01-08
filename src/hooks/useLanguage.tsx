import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from 'react';
import { type Language, t as translate, type TranslationKey } from '../utils/translations';

function getLanguageFromURL(): Language {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang === 'en-US' || lang === 'pt-BR') {
    return lang;
  }
  return 'pt-BR'; // Default
}

function setLanguageInURL(lang: Language) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url.toString());
}

interface LanguageContextValue {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getLanguageFromURL);

  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const handlePopState = () => {
      setLang(getLanguageFromURL());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang: Language = lang === 'pt-BR' ? 'en-US' : 'pt-BR';
    setLang(newLang);
    setLanguageInURL(newLang);
  }, [lang]);

  const t = useCallback((key: TranslationKey) => {
    return translate(key, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
