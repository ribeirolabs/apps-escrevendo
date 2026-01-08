import type { Category } from '../utils/letters';

interface CategorySelectionProps {
  onSelect: (category: Category) => void;
}

export function CategorySelection({ onSelect }: CategorySelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <img 
        src={`${import.meta.env.BASE_URL}icon.png`}
        alt="Escrevendo" 
        className="w-32 h-32 mb-4 rounded-3xl shadow-lg"
      />
      <h1 className="text-5xl font-bold text-purple-800 mb-4">Escrevendo</h1>
      <p className="text-xl text-purple-600 mb-12">O que você quer praticar?</p>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => onSelect('letters')}
          className="bg-pastel-mint hover:bg-pastel-blue text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🔤 Letras
        </button>

        <button
          onClick={() => onSelect('numbers')}
          className="bg-pastel-yellow hover:bg-pastel-pink text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🔢 Números
        </button>

        <button
          onClick={() => onSelect('words')}
          className="bg-pastel-blue hover:bg-pastel-purple text-gray-700 font-semibold py-6 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          📝 Palavras
        </button>
      </div>
    </div>
  );
}
