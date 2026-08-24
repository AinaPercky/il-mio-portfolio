import { useRef } from 'react';
import { Target, Code2, LineChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimeReveal } from '../hooks/useAnimeReveal';
import { SectionHeading } from './SectionHeading';
import { StatCard } from './StatCard';

const statsPresentation = [
  { icon: Code2, colorClass: 'text-brand-main', backgroundClass: 'bg-brand-main/10' },
  { icon: Target, colorClass: 'text-brand-orange', backgroundClass: 'bg-brand-orange/10' },
  { icon: LineChart, colorClass: 'text-brand-yellow', backgroundClass: 'bg-brand-yellow/10' },
] as const;

export const About = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const { animateHover } = useAnimeReveal({ root, staggerDelay: 85 });

  const stats = statsPresentation.map((presentation, index) => ({
    ...presentation,
    label: t.about.stats[index],
  }));

  return (
    <section ref={root} id="about" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow={t.nav.about}
              title={t.about.title}
              className="mb-6"
            />
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>

          <div data-stagger className="grid gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                colorClass={stat.colorClass}
                backgroundClass={stat.backgroundClass}
                onHover={animateHover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
