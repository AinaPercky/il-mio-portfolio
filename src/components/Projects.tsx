import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimeReveal } from '../hooks/useAnimeReveal';
import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';

export const Projects = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const { animateHover } = useAnimeReveal({ root });

  return (
    <section ref={root} id="projects" className="py-16 sm:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title={t.projects.title}
          dataReveal
          className="mb-12 sm:mb-16"
          eyebrowClassName="text-brand-light"
          titleClassName="text-white text-3xl lg:text-4xl"
        />

        <div data-stagger className="grid lg:grid-cols-2 gap-8">
          {t.projects.items.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              labels={t.labels}
              onHover={animateHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
