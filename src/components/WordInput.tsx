import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface WordInputProps {
  onSubmit: (word: string) => void;
  onBack: () => void;
}

export function WordInput({ onSubmit, onBack }: WordInputProps) {
  const [word, setWord] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = word.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed.toUpperCase());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">{t('words')}</h1>
      <p className="text-xl text-purple-600 mb-8">{t('typeWord')}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder={t('typeHere')}
          autoFocus
          className="w-full py-4 px-6 text-2xl text-center rounded-2xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none shadow-md"
          maxLength={12}
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-pastel-pink hover:bg-pink-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl text-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            ← {t('back')}
          </button>

          <button
            type="submit"
            disabled={word.trim().length === 0}
            className="flex-1 bg-pastel-mint hover:bg-green-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl text-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {t('start')} →
          </button>
        </div>
      </form>
    </div>
  );
}
