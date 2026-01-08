import { CategorySelection } from './components/CategorySelection';
import { ModeSelection } from './components/ModeSelection';
import { TracingPage } from './components/TracingPage';
import { useHashRouter } from './hooks/useHashRouter';
import type { Mode, Category } from './utils/letters';

function App() {
  const {
    screen,
    category,
    mode,
    letterCase,
    goToCategory,
    goToMode,
    goToTracing,
    updateLetterCase,
  } = useHashRouter();

  const handleCategorySelect = (selectedCategory: Category) => {
    goToMode(selectedCategory);
  };

  const handleModeSelect = (selectedMode: Mode) => {
    if (category) {
      goToTracing(category, selectedMode, 'uppercase');
    }
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
      />
    );
  }

  // Fallback to category selection
  return <CategorySelection onSelect={handleCategorySelect} />;
}

export default App;
