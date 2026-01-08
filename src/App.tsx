import { CategorySelection } from './components/CategorySelection';
import { ModeSelection } from './components/ModeSelection';
import { TracingPage } from './components/TracingPage';
import { WordInput } from './components/WordInput';
import { useHashRouter } from './hooks/useHashRouter';
import type { Mode, Category } from './utils/letters';

function App() {
  const {
    screen,
    category,
    mode,
    letterCase,
    word,
    goToCategory,
    goToMode,
    goToTracing,
    goToWordInput,
    goToWordTracing,
    updateLetterCase,
  } = useHashRouter();

  const handleCategorySelect = (selectedCategory: Category) => {
    if (selectedCategory === 'words') {
      goToWordInput();
    } else {
      goToMode(selectedCategory);
    }
  };

  const handleModeSelect = (selectedMode: Mode) => {
    if (category) {
      goToTracing(category, selectedMode, 'uppercase');
    }
  };

  const handleWordSubmit = (submittedWord: string) => {
    goToWordTracing(submittedWord);
  };

  const handleBackToCategory = () => {
    goToCategory();
  };

  const handleBackToHome = () => {
    goToCategory();
  };

  if (screen === 'category') {
    return <CategorySelection onSelect={handleCategorySelect} />;
  }

  if (screen === 'wordInput') {
    return (
      <WordInput
        onSubmit={handleWordSubmit}
        onBack={handleBackToCategory}
      />
    );
  }

  if (screen === 'mode' && category) {
    return (
      <ModeSelection
        category={category}
        onStart={handleModeSelect}
        onBack={handleBackToCategory}
      />
    );
  }

  if (screen === 'tracing' && category && mode) {
    return (
      <TracingPage
        category={category}
        mode={mode}
        initialCase={letterCase || 'uppercase'}
        onBack={handleBackToHome}
        onCaseChange={updateLetterCase}
        word={word}
      />
    );
  }

  // Fallback to category selection
  return <CategorySelection onSelect={handleCategorySelect} />;
}

export default App;
