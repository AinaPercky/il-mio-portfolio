import { useRef } from 'react';
import { MonitorSmartphone, Workflow, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimeReveal } from '../hooks/useAnimeReveal';
import { SectionHeading } from './SectionHeading';
import { ServiceCard } from './ServiceCard';

const servicePresentation = [
  { icon: MonitorSmartphone, colorClass: 'bg-brand-main text-white' },
  { icon: Workflow, colorClass: 'bg-brand-dark text-white' },
  { icon: Users, colorClass: 'bg-brand-yellow text-brand-dark' },
] as const;

export const Services = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement | null>(null);
  const { animateHover } = useAnimeReveal({ root });

  return (
    <section ref={root} id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow={t.labels.expertise}
          title={t.services.title}
          dataReveal
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          eyebrowClassName="text-brand-main"
          titleClassName="text-brand-dark text-3xl lg:text-4xl"
        />

        <div data-stagger className="grid md:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const presentation = servicePresentation[index];
            if (!presentation) return null;

            return (
              <ServiceCard
                key={service.title}
                service={service}
                icon={presentation.icon}
                colorClass={presentation.colorClass}
                onHover={animateHover}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
