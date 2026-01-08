import { useCallback, useState, useEffect, useRef } from 'react';
import type { Mode, LetterCase, Category } from '../utils/letters';
import { TracingCanvas } from './TracingCanvas';
import { Controls } from './Controls';
import { ColorPicker } from './ColorPicker';
import { useTracing } from '../hooks/useTracing';

function useSpeech() {
  const synth = useRef<SpeechSynthesis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    synth.current = window.speechSynthesis;
  }, []);

  const speak = useCallback((text: string) => {
    if (!synth.current) return;
    
    // Cancel any ongoing speech
    synth.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.current.speak(utterance);
  }, []);

  return { speak, isSpeaking };
}

interface TracingPageProps {
  category: Category;
  mode: Mode;
  initialCase: LetterCase;
  onBack: () => void;
  onCaseChange?: (letterCase: LetterCase) => void;
}

export function TracingPage({ category, mode, initialCase, onBack, onCaseChange }: TracingPageProps) {
  const [strokeColor, setStrokeColor] = useState('#9b87f5');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { speak, isSpeaking } = useSpeech();

  const {
    currentCharacter,
    letterCase,
    clearTrigger,
    handleNext,
    handleClear,
    handleToggleCase,
  } = useTracing({ category, mode, initialCase });

  // Notify parent of case changes for URL update
  useEffect(() => {
    onCaseChange?.(letterCase);
  }, [letterCase, onCaseChange]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleNextCharacter = useCallback(() => {
    handleNext();
  }, [handleNext]);

  const handleClearDrawing = useCallback(() => {
    handleClear();
  }, [handleClear]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleListen = useCallback(() => {
    // For letters, just speak the lowercase version to avoid "M maiúsculo"
    const textToSpeak = category === 'letters' 
      ? currentCharacter.toLowerCase() 
      : currentCharacter;
    speak(textToSpeak);
  }, [speak, currentCharacter, category]);

  return (
    <div className="flex flex-col h-screen p-4 pt-safe overflow-hidden">
      {/* Header with back button and controls */}
      <header className="flex items-center justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-pastel-pink hover:bg-pastel-purple text-gray-700 font-semibold py-2 px-4 rounded-xl text-lg shadow transition-all duration-200"
        >
          ← Voltar
        </button>

        <Controls
          category={category}
          letterCase={letterCase}
          onClear={handleClearDrawing}
          onNext={handleNextCharacter}
          onToggleCase={handleToggleCase}
          onListen={handleListen}
          isSpeaking={isSpeaking}
        />

        <button
          onClick={toggleFullscreen}
          className="bg-pastel-purple hover:bg-purple-200 text-gray-700 font-semibold py-2 px-4 rounded-xl shadow transition-all duration-200"
          title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
        >
          {isFullscreen ? '⊠' : '⛶'}
        </button>
      </header>

      {/* Canvas centered in remaining space */}
      <div className="flex-1 flex items-center justify-center">
        <TracingCanvas
          character={currentCharacter}
          clearTrigger={clearTrigger}
          strokeColor={strokeColor}
        />
      </div>
      
      {/* Color picker pinned to bottom */}
      <div className="flex justify-center pb-safe">
        <ColorPicker
          selectedColor={strokeColor}
          onColorChange={setStrokeColor}
        />
      </div>
    </div>
  );
}
