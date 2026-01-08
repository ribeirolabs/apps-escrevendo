interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const COLORS = [
  { name: 'Roxo', value: '#9b87f5' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Laranja', value: '#f97316' },
  { name: 'Amarelo', value: '#eab308' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Ciano', value: '#06b6d4' },
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {COLORS.map((color) => (
        <button
          key={color.value}
          onClick={() => onColorChange(color.value)}
          className={`w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${
            selectedColor === color.value
              ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
              : 'ring-2 ring-gray-200'
          }`}
          style={{ backgroundColor: color.value }}
          title={color.name}
          aria-label={`Cor ${color.name}`}
        />
      ))}
    </div>
  );
}
