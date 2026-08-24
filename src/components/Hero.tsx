import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHeroAnimation } from '../hooks/useHeroAnimation';

export const Hero = () => {
  const { language, t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  useHeroAnimation(root, language);

  return (
    <section ref={root} className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
      <div className="absolute inset-0 -z-10 bg-white" aria-hidden="true">
        <div data-hero-ambient="primary" className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-light/30 blur-3xl opacity-60" />
        <div data-hero-ambient="secondary" className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-yellow/10 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
        <div>
          <h1 key={language} data-hero-title className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-brand-dark mb-6 leading-[1.1]">
            <span className="block">{t.hero.greeting}</span>
            <span className="text-brand-main">{t.hero.title}</span>
          </h1>
          <h2 data-hero-subtitle className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 mb-8 max-w-2xl">{t.hero.subtitle}</h2>
          <p data-hero-hook className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 max-w-xl leading-relaxed">{t.hero.hook}</p>
          <div data-hero-actions className="flex flex-wrap items-center gap-4">
            <a data-hero-action href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-orange hover:bg-[#e67a00] rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              {t.hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </a>
            <a data-hero-action href="#projects" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border border-gray-200 hover:border-brand-main hover:text-brand-main rounded-full transition-all shadow-sm">
              {t.nav.projects}
            </a>
          </div>
        </div>

        <div data-hero-portrait className="relative block mt-8 lg:mt-0 w-full">
          <div className="relative w-full max-w-[390px] mx-auto lg:ml-auto aspect-[635/932]">
            <div className="absolute inset-[3%] bg-[#27180f] rounded-[42%] rotate-3 shadow-2xl" aria-hidden="true" />
            <div className="absolute inset-[3%] bg-[#27180f] rounded-[42%] -rotate-3 shadow-xl" aria-hidden="true" />
            <div data-hero-orbit className="absolute inset-0 rounded-[42%] border-2 border-brand-yellow border-dashed" aria-hidden="true" />
            <div className="absolute inset-[7%] flex items-center justify-center bg-[#150a04] rounded-[36%] shadow-2xl overflow-hidden border-4 border-white z-10">
              <img src="/Percky.png" alt="RAMANOARA Percky" className="w-full h-full object-contain object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
