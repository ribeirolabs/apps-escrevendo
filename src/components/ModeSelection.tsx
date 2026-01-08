import type { Mode, Category } from '../utils/letters';

interface ModeSelectionProps {
  category: Category;
  onStart: (mode: Mode) => void;
  onBack: () => void;
}

export function ModeSelection({ category, onStart, onBack }: ModeSelectionProps) {
  const categoryLabel = category === 'letters' ? 'letras' : 'números';
  const sequenceLabel = category === 'letters' ? '🔤 Alfabeto' : '🔢 Sequência';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold text-purple-800 mb-4">Escrevendo</h1>
      <p className="text-xl text-purple-600 mb-12">
        Como você quer praticar as {categoryLabel}?
      </p>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => onStart('sequence')}
          className="bg-pastel-mint hover:bg-pastel-blue text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {sequenceLabel}
        </button>

        <button
          onClick={() => onStart('random')}
          className="bg-pastel-yellow hover:bg-pastel-pink text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🎲 Aleatório
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-12 text-purple-500 hover:text-purple-700 text-lg underline transition-colors"
      >
        ← Voltar
      </button>
    </div>
  );
}
