import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MonitorSmartphone, Workflow, Users } from 'lucide-react';
import { animate, createScope, onScroll, stagger } from 'animejs';

const ICONS = [MonitorSmartphone, Workflow, Users];
const COLORS = [
  'bg-brand-main text-white',
  'bg-brand-dark text-white',
  'bg-brand-yellow text-brand-dark',
];

export const Services = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const heading = root.current?.querySelector<HTMLElement>('[data-reveal]');
      const grid = root.current?.querySelector<HTMLElement>('[data-stagger]');
      const cards = root.current?.querySelectorAll<HTMLElement>('[data-card]');

      if (heading) {
        animate(heading, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          duration: 650,
          ease: 'outQuad',
          autoplay: onScroll({ target: heading, repeat: false, enter: 'bottom-=100' }),
        });
      }

      if (grid && cards?.length) {
        animate(cards, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: stagger(90),
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
    <section ref={root} id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">
            {t.labels.expertise}
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark">{t.services.title}</h3>
        </div>

        <div data-stagger className="grid md:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const Icon = ICONS[index];
            const colorClass = COLORS[index];

            return (
              <div
                key={index}
                data-card
                onMouseEnter={(event) => handleCardHover(event.currentTarget, true)}
                onMouseLeave={(event) => handleCardHover(event.currentTarget, false)}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${colorClass} transition-transform group-hover:scale-110`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
