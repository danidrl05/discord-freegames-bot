import en from './en';
import ca from './ca';
import es from './es';

const translations = { en, ca, es };

export type Language = keyof typeof translations;
export type Translations = typeof en;

export function t(language: string): Translations {
    return translations[language as Language] ?? translations.en;
}