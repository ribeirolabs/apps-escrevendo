import type { Category, LetterCase } from '../utils/letters';

interface ControlsProps {
  category: Category;
  letterCase: LetterCase;
  onClear: () => void;
  onNext: () => void;
  onToggleCase: () => void;
}

export function Controls({
  category,
  letterCase,
  onClear,
  onNext,
  onToggleCase,
}: ControlsProps) {
  const showCaseToggle = category === 'letters';

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onClear}
        className="bg-pastel-pink hover:bg-pink-200 text-gray-700 font-semibold py-2 px-4 rounded-xl shadow transition-all duration-200 hover:scale-105 active:scale-95"
        title="Limpar"
      >
        🧹
      </button>

      {showCaseToggle && (
        <button
          onClick={onToggleCase}
          className="bg-pastel-blue hover:bg-blue-200 text-gray-700 font-bold py-2 px-4 rounded-xl shadow transition-all duration-200 hover:scale-105 active:scale-95"
          title={letterCase === 'uppercase' ? 'Minúsculas' : 'Maiúsculas'}
        >
          {letterCase === 'uppercase' ? 'Aa' : 'AA'}
        </button>
      )}

      <button
        onClick={onNext}
        className="bg-pastel-mint hover:bg-green-200 text-gray-700 font-semibold py-2 px-4 rounded-xl shadow transition-all duration-200 hover:scale-105 active:scale-95"
        title="Próxima"
      >
        →
      </button>
    </div>
  );
}
