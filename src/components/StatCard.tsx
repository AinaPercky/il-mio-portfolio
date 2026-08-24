import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  colorClass: string;
  backgroundClass: string;
  onHover: (element: HTMLElement, hovered: boolean) => void;
}

export const StatCard: FC<StatCardProps> = ({
  icon: Icon,
  label,
  colorClass,
  backgroundClass,
  onHover,
}: StatCardProps) => (
  <article
    data-card
    onMouseEnter={(event) => onHover(event.currentTarget, true)}
    onMouseLeave={(event) => onHover(event.currentTarget, false)}
    className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow"
  >
    <div className={`p-4 rounded-xl ${backgroundClass}`}>
      <Icon className={`w-8 h-8 ${colorClass}`} aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-brand-dark">{label}</h3>
  </article>
);
