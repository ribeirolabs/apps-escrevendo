import type { Category, LetterCase } from '../utils/letters';

interface ControlsProps {
  category: Category;
  letterCase: LetterCase;
  onClear: () => void;
  onNext: () => void;
  onToggleCase: () => void;
  onListen: () => void;
  isSpeaking: boolean;
}

export function Controls({
  category,
  letterCase,
  onClear,
  onNext,
  onToggleCase,
  onListen,
  isSpeaking,
}: ControlsProps) {
  const showCaseToggle = category === 'letters';

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onClear}
        className="bg-pastel-pink hover:bg-pink-200 text-gray-700 font-semibold py-4 px-5 rounded-2xl shadow-md text-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        title="Limpar"
      >
        🧹
      </button>

      <button
        onClick={onListen}
        disabled={isSpeaking}
        className={`bg-pastel-yellow hover:bg-yellow-200 text-gray-700 font-semibold py-4 px-5 rounded-2xl shadow-md text-2xl transition-all duration-200 hover:scale-105 active:scale-95 ${isSpeaking ? 'animate-pulse' : ''}`}
        title="Ouvir"
      >
        🔊
      </button>

      {showCaseToggle && (
        <button
          onClick={onToggleCase}
          className="bg-pastel-blue hover:bg-blue-200 text-gray-700 font-bold py-4 px-5 rounded-2xl shadow-md text-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          title={letterCase === 'uppercase' ? 'Minúsculas' : letterCase === 'lowercase' ? 'Ambas' : 'Maiúsculas'}
        >
          {letterCase === 'uppercase' ? 'AA' : letterCase === 'lowercase' ? 'aa' : 'Aa'}
        </button>
      )}

      <button
        onClick={onNext}
        className="bg-pastel-mint hover:bg-green-200 text-gray-700 font-semibold py-4 px-5 rounded-2xl shadow-md text-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        title="Próxima"
      >
        →
      </button>
    </div>
  );
}
