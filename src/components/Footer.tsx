import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark py-8 text-center border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p>© {currentYear} RAMANOARA Percky. {t.footer.rights}</p>
      </div>
    </footer>
  );
};
