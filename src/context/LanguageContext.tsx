import React, { createContext, useContext, useState, useEffect } from 'react';
import fr from '../i18n/locales/fr.json';
import en from '../i18n/locales/en.json';
import mg from '../i18n/locales/mg.json';
import it from '../i18n/locales/it.json';

type Language = 'fr' | 'en' | 'mg' | 'it';
type Translations = typeof fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  fr,
  en,
  mg,
  it,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
