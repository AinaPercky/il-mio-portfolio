import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '../types/content';

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
  colorClass: string;
  onHover: (element: HTMLElement, hovered: boolean) => void;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, icon: Icon, colorClass, onHover }: ServiceCardProps) => (
  <article
    data-card
    onMouseEnter={(event) => onHover(event.currentTarget, true)}
    onMouseLeave={(event) => onHover(event.currentTarget, false)}
    className="group p-6 sm:p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${colorClass} transition-transform group-hover:scale-110`}>
      <Icon className="w-7 h-7" aria-hidden="true" />
    </div>
    <h4 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h4>
    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
  </article>
);
