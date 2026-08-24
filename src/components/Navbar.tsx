import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { animate, createScope, stagger } from 'animejs';
import { useLanguage } from '../context/LanguageContext';
import type { NavLink } from '../types/content';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const activeLanguage = language === 'mg' ? 'fr' : language;

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

  const navLinks: ReadonlyArray<NavLink> = [
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

        <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-8">
          <LanguageSelector language={activeLanguage} onChange={setLanguage} />

          <button
            className="md:hidden text-brand-dark p-0.5"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} links={navLinks} onNavigate={() => setIsOpen(false)} />
    </nav>
  );
};
