import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { animate, createScope, splitText, stagger } from 'animejs';

export const Hero = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const title = root.current?.querySelector<HTMLElement>('[data-hero-title]');
      const hook = root.current?.querySelector<HTMLElement>('[data-hero-hook]');
      const actions = root.current?.querySelector<HTMLElement>('[data-hero-actions]');
      const portrait = root.current?.querySelector<HTMLElement>('[data-hero-portrait]');

      if (title) {
        const split = splitText(title, { words: true, accessible: true });
        const words = split.words as HTMLElement[];
        animate(words, {
          opacity: [0, 1],
          translateY: ['1.25rem', '0rem'],
          delay: stagger(70),
          duration: 600,
          ease: 'outExpo',
        });
      }

      if (hook) {
        animate(hook, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: 400,
          duration: 600,
          ease: 'outQuad',
        });
      }

      if (actions) {
        animate(actions, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: 520,
          duration: 600,
          ease: 'outQuad',
        });
      }

      if (portrait) {
        animate(portrait, {
          opacity: [0, 1],
          scale: [0.96, 1],
          translateY: ['0.75rem', '0rem'],
          delay: 180,
          duration: 800,
          ease: 'outExpo',
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-light/30 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-yellow/10 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
        <div>
          <h1 data-hero-title className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-brand-dark mb-6 leading-[1.1]">
            <span className="block">{t.hero.greeting}</span>
            <span className="text-brand-main">{t.hero.title}</span>
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 mb-8 max-w-2xl">{t.hero.subtitle}</h2>
          <p data-hero-hook className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 max-w-xl leading-relaxed">{t.hero.hook}</p>
          <div data-hero-actions className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-orange hover:bg-[#e67a00] rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              {t.hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#projects" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border border-gray-200 hover:border-brand-main hover:text-brand-main rounded-full transition-all shadow-sm">
              {t.nav.projects}
            </a>
          </div>
        </div>

        <div data-hero-portrait className="relative block mt-8 lg:mt-0 w-full">
          <div className="relative w-full max-w-[390px] mx-auto lg:ml-auto aspect-[635/932]">
            <div className="absolute inset-[3%] bg-[#27180f] rounded-[42%] rotate-3 shadow-2xl" />
            <div className="absolute inset-[3%] bg-[#27180f] rounded-[42%] -rotate-3 shadow-xl" />
            <div className="absolute inset-0 rounded-[42%] border-2 border-brand-yellow border-dashed animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[7%] flex items-center justify-center bg-[#150a04] rounded-[36%] shadow-2xl overflow-hidden border-4 border-white z-10">
              <img src="/Percky.png" alt="RAMANOARA Percky" className="w-full h-full object-contain object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
