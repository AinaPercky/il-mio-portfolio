import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
      <div className="absolute inset-0 -z-10 bg-white">
        {/* Abstract shapes representing minimal modern vibe */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-light/30 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-yellow/10 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark mb-6 leading-[1.1]">
            <span className="block">{t.hero.greeting}</span>
            <span className="text-brand-main">{t.hero.title}</span>
          </h1>
          <h2 className="text-xl lg:text-2xl font-medium text-gray-600 mb-8 max-w-2xl">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed">
            {t.hero.hook}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-orange hover:bg-[#e67a00] rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border border-gray-200 hover:border-brand-main hover:text-brand-main rounded-full transition-all shadow-sm"
            >
              {t.nav.projects}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-[4/5] max-w-[430px] ml-auto">
            {/* Portrait-oriented frame: it follows the source image ratio instead of forcing a square crop. */}
            <div className="absolute inset-[3%] bg-brand-main rounded-[42%] rotate-3 shadow-2xl" />
            <div className="absolute inset-[3%] bg-brand-dark rounded-[42%] -rotate-3 shadow-xl" />
            <div className="absolute inset-0 rounded-[42%] border-2 border-brand-yellow border-dashed animate-[spin_20s_linear_infinite]" />

            {/* Profile Image */}
            <div className="absolute inset-[7%] flex items-center justify-center bg-[#27180f] rounded-[36%] shadow-2xl overflow-hidden border-4 border-white z-10">
              <img
                src="/Percky.png"
                alt="RAMANOARA Percky"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
