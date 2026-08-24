import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';
import { animate, createScope, onScroll, stagger } from 'animejs';

export const Skills = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const headings = root.current?.querySelectorAll<HTMLElement>('[data-reveal]');
      const categories = root.current?.querySelectorAll<HTMLElement>('[data-category]');
      const softSkills = root.current?.querySelectorAll<HTMLElement>('[data-soft-skill]');

      if (headings?.length) {
        animate(headings, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: stagger(100),
          duration: 650,
          ease: 'outQuad',
          autoplay: onScroll({ target: root.current!, repeat: false, enter: 'bottom-=100' }),
        });
      }

      if (categories?.length) {
        animate(categories, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: stagger(85),
          duration: 600,
          ease: 'outQuad',
          autoplay: onScroll({ target: root.current!, repeat: false, enter: 'bottom-=100' }),
        });
      }

      if (softSkills?.length) {
        animate(softSkills, {
          opacity: [0, 1],
          translateX: ['1rem', '0rem'],
          delay: stagger(75),
          duration: 600,
          ease: 'outQuad',
          autoplay: onScroll({ target: root.current!, repeat: false, enter: 'bottom-=100' }),
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section ref={root} id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div data-reveal className="mb-12">
              <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">{t.labels.expertise}</h2>
              <h3 className="text-3xl font-bold text-brand-dark">{t.skills.title}</h3>
            </div>

            <div className="space-y-8">
              {t.skills.categories.map((category, index) => (
                <div key={index} data-category>
                  <h4 className="text-lg font-semibold text-brand-dark mb-4 border-b border-gray-100 pb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-3">
                    {category.list.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-50 text-brand-dark font-medium rounded-xl border border-gray-100 hover:border-brand-main hover:text-brand-main transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div data-reveal className="mb-12">
              <h2 className="text-sm font-bold tracking-wider text-brand-orange uppercase mb-3">{t.labels.softSkills}</h2>
              <h3 className="text-3xl font-bold text-brand-dark">{t.softSkills.title}</h3>
            </div>

            <div className="space-y-6">
              {t.softSkills.items.map((item, index) => (
                <div key={index} data-soft-skill className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-main" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-dark mb-1">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
