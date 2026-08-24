import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';

const flags = {
  fr: '🇫🇷',
  it: '🇮🇹',
  en: '🇬🇧',
} as const;

const languageNames = {
  fr: 'Français',
  it: 'Italiano',
  en: 'English',
} as const;

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-brand-dark tracking-tight">
          RAMANOARA <span className="text-brand-main">Percky</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-dark hover:text-brand-main font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section: Language Selector & Mobile Toggle */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Language Selector */}
          <div className="flex items-center gap-1" aria-label="Choisir la langue">
            {(Object.keys(flags) as Array<keyof typeof flags>).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-full text-xl transition-all',
                  language === lang
                    ? 'bg-brand-main/15 ring-2 ring-brand-main scale-105'
                    : 'opacity-60 hover:bg-gray-100 hover:opacity-100'
                )}
                aria-label={`Afficher le site en ${languageNames[lang]}`}
                aria-pressed={language === lang}
                title={languageNames[lang]}
              >
                {flags[lang]}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-brand-dark"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-brand-dark hover:text-brand-main font-medium block py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
