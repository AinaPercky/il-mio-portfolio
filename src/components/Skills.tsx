import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimeReveal } from '../hooks/useAnimeReveal';
import type { StaggerGroup } from '../hooks/useAnimeReveal';

const skillsAnimationGroups: ReadonlyArray<StaggerGroup> = [
  { rootSelector: '[data-categories]', itemSelector: '[data-category]', delay: 85 },
  { rootSelector: '[data-soft-skills]', itemSelector: '[data-soft-skill]', delay: 75, axis: 'x' },
];

export const Skills = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  useAnimeReveal({ root, revealAll: true, revealDelay: 100, staggerGroups: skillsAnimationGroups });

  return (
    <section ref={root} id="skills" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div data-reveal className="mb-8 sm:mb-12">
              <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">{t.labels.expertise}</h2>
              <h3 className="text-3xl font-bold text-brand-dark">{t.skills.title}</h3>
            </div>

            <div data-categories className="space-y-8">
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
            <div data-reveal className="mb-8 sm:mb-12">
              <h2 className="text-sm font-bold tracking-wider text-brand-orange uppercase mb-3">{t.labels.softSkills}</h2>
              <h3 className="text-3xl font-bold text-brand-dark">{t.softSkills.title}</h3>
            </div>

            <div data-soft-skills className="space-y-6">
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
