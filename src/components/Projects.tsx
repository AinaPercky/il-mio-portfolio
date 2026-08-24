import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { animate, createScope, onScroll, stagger } from 'animejs';

export const Projects = () => {
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
    <section ref={root} id="projects" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="mb-16">
          <h2 className="text-sm font-bold tracking-wider text-brand-light uppercase mb-3">Portfolio</h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-white">{t.projects.title}</h3>
        </div>

        <div data-stagger className="grid lg:grid-cols-2 gap-8">
          {t.projects.items.map((project, index) => (
            <div
              key={index}
              data-card
              onMouseEnter={(event) => handleCardHover(event.currentTarget, true)}
              onMouseLeave={(event) => handleCardHover(event.currentTarget, false)}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="absolute top-8 right-8">
                {project.link ? (
                  <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 pr-16">{project.title}</h4>

              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-brand-light font-medium text-sm">{t.labels.context}</span>
                  <p className="text-gray-300 mt-1">{project.context}</p>
                </div>
                <div>
                  <span className="text-brand-light font-medium text-sm">{t.labels.role}</span>
                  <p className="text-gray-300 mt-1">{project.role}</p>
                </div>
                <div>
                  <span className="text-brand-light font-medium text-sm">{t.labels.result}</span>
                  <p className="text-gray-300 mt-1">{project.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
