import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { animate, createScope, stagger } from 'animejs';

type SupportedLanguage = 'fr' | 'it' | 'en';

const languages: Array<{ code: SupportedLanguage; name: string }> = [
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' },
];

const FlagIcon = ({ code }: { code: SupportedLanguage }) => {
  if (code === 'fr') {
    return (
      <svg viewBox="0 0 30 20" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
        <rect width="10" height="20" fill="#0055A4" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#EF4135" />
      </svg>
    );
  }

  if (code === 'it') {
    return (
      <svg viewBox="0 0 30 20" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
        <rect width="10" height="20" fill="#009246" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#CE2B37" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#FFFFFF" strokeWidth="9" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="14" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
};

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      animate(root.current!, {
        opacity: [0, 1],
        translateY: ['-0.75rem', '0rem'],
        duration: 650,
        ease: 'outQuad',
      });
      animate(root.current!.querySelectorAll('[data-language-button]'), {
        opacity: [0, 1],
        translateY: ['-0.5rem', '0rem'],
        delay: stagger(60),
        duration: 500,
        ease: 'outQuad',
      });
    });

    return () => scope.current?.revert();
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      ref={root}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        <a href="#" className="text-base sm:text-xl font-bold text-brand-dark tracking-tight whitespace-nowrap">
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
        <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-8">
          {/* Language Selector */}
          <div className="flex items-center gap-1" aria-label="Choisir la langue">
            {languages.map(({ code, name }) => (
              <button
                key={code}
                type="button"
                data-language-button
                onClick={() => setLanguage(code)}
                className={clsx(
                  'flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all',
                  language === code
                    ? 'bg-brand-main/15 ring-2 ring-brand-main scale-105'
                    : 'opacity-60 hover:bg-gray-100 hover:opacity-100'
                )}
                aria-label={`Afficher le site en ${name}`}
                aria-pressed={language === code}
                title={name}
              >
                <FlagIcon code={code} />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-brand-dark p-0.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            id="mobile-menu"
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
