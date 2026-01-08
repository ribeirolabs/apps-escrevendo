import type { Category } from '../utils/letters';
import { useLanguage } from '../hooks/useLanguage';

interface CategorySelectionProps {
  onSelect: (category: Category) => void;
}

export function CategorySelection({ onSelect }: CategorySelectionProps) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">
      {/* Language toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 text-3xl hover:scale-110 transition-transform"
        title={lang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
      >
        {lang === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
      </button>

      <img 
        src={`${import.meta.env.BASE_URL}icon.png`}
        alt={t('appName')} 
        className="w-32 h-32 mb-4 rounded-3xl shadow-lg"
      />
      <h1 className="text-5xl font-bold text-purple-800 mb-4">{t('appName')}</h1>
      <p className="text-xl text-purple-600 mb-12">{t('whatToPractice')}</p>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => onSelect('letters')}
          className="bg-pastel-mint hover:bg-pastel-blue text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🔤 {t('letters')}
        </button>

        <button
          onClick={() => onSelect('numbers')}
          className="bg-pastel-yellow hover:bg-pastel-pink text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🔢 {t('numbers')}
        </button>

        <button
          onClick={() => onSelect('words')}
          className="bg-pastel-blue hover:bg-pastel-purple text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          📝 {t('words')}
        </button>
      </div>
    </div>
  );
}
