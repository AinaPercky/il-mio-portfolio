import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, Code2, LineChart } from 'lucide-react';
import { animate, createScope, onScroll, stagger } from 'animejs';

export const About = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  const stats = [
    { icon: Code2, label: t.about.stats[0], color: 'text-brand-main', bg: 'bg-brand-main/10' },
    { icon: Target, label: t.about.stats[1], color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
    { icon: LineChart, label: t.about.stats[2], color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
  ];

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const copy = root.current?.querySelector<HTMLElement>('[data-reveal]');
      const grid = root.current?.querySelector<HTMLElement>('[data-stagger]');
      const cards = root.current?.querySelectorAll<HTMLElement>('[data-card]');

      if (copy) {
        animate(copy, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          duration: 650,
          ease: 'outQuad',
          autoplay: onScroll({ target: copy, repeat: false, enter: 'bottom-=100' }),
        });
      }

      if (grid && cards?.length) {
        animate(cards, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: stagger(85),
          duration: 600,
          ease: 'outQuad',
          autoplay: onScroll({ target: grid, repeat: false, enter: 'bottom-=100' }),
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  const handleCardHover = (element: HTMLElement, hovered: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scope.current?.execute(() => {
      animate(element, {
        scale: hovered ? 1.02 : 1,
        translateY: hovered ? '-0.25rem' : '0rem',
        duration: 260,
        ease: 'outQuad',
      });
    });
  };

  return (
    <section ref={root} id="about" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">
              {t.nav.about}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6">
              {t.about.title}
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>

          <div data-stagger className="grid gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  data-card
                  onMouseEnter={(event) => handleCardHover(event.currentTarget, true)}
                  onMouseLeave={(event) => handleCardHover(event.currentTarget, false)}
                  className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow"
                >
                  <div className={`p-4 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-brand-dark">{stat.label}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
