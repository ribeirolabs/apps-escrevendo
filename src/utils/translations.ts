export type Language = 'pt-BR' | 'en-US';

export const translations = {
  'pt-BR': {
    appName: 'Escrevendo',
    whatToPractice: 'O que você quer praticar?',
    letters: 'Letras',
    numbers: 'Números',
    words: 'Palavras',
    back: 'Voltar',
    clear: 'Limpar',
    listen: 'Ouvir',
    next: 'Próxima',
    fullscreen: 'Tela cheia',
    exitFullscreen: 'Sair da tela cheia',
    chooseColor: 'Escolha uma cor',
    typeWord: 'Digite a palavra para praticar:',
    typeHere: 'Digite aqui...',
    start: 'Começar',
    sequence: 'Sequência',
    random: 'Aleatório',
    alphabet: 'Alfabeto',
    howToPractice: 'Como você quer praticar?',
    uppercase: 'Maiúsculas',
    lowercase: 'Minúsculas',
    both: 'Ambas',
  },
  'en-US': {
    appName: 'Writing',
    whatToPractice: 'What do you want to practice?',
    letters: 'Letters',
    numbers: 'Numbers',
    words: 'Words',
    back: 'Back',
    clear: 'Clear',
    listen: 'Listen',
    next: 'Next',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    chooseColor: 'Choose a color',
    typeWord: 'Type the word to practice:',
    typeHere: 'Type here...',
    start: 'Start',
    sequence: 'Sequence',
    random: 'Random',
    alphabet: 'Alphabet',
    howToPractice: 'How do you want to practice?',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    both: 'Both',
  },
} as const;

export type TranslationKey = keyof typeof translations['pt-BR'];

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key];
}
