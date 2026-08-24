import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: ReactNode;
  title: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  dataReveal?: boolean;
}

export const SectionHeading = ({
  eyebrow,
  title,
  className = '',
  eyebrowClassName = 'text-brand-main',
  titleClassName = 'text-brand-dark',
  dataReveal = false,
}: SectionHeadingProps) => (
  <div className={className} data-reveal={dataReveal ? true : undefined}>
    <p className={`text-sm font-bold tracking-wider uppercase mb-3 ${eyebrowClassName}`}>{eyebrow}</p>
    <h2 className={`text-3xl lg:text-4xl font-bold ${titleClassName}`}>{title}</h2>
  </div>
);
