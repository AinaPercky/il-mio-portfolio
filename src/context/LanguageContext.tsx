import { createContext, useContext, useState, type ReactNode } from 'react';
import fr from '../i18n/locales/fr.json';
import en from '../i18n/locales/en.json';
import mg from '../i18n/locales/mg.json';
import it from '../i18n/locales/it.json';
import type { Language, Translations } from '../types/content';

export type { Language } from '../types/content';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  fr,
  en,
  mg,
  it,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
