import type { SupportedLanguage } from '../types/content';

interface LanguageSelectorProps {
  language: SupportedLanguage;
  onChange: (language: SupportedLanguage) => void;
}

const languages: ReadonlyArray<{ code: SupportedLanguage; name: string }> = [
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' },
];

const FlagIcon = ({ code }: { code: SupportedLanguage }) => {
  if (code === 'fr') {
    return (
      <svg viewBox="0 0 30 20" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
        <rect width="10" height="20" fill="#0055A4" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#EF4135" />
      </svg>
    );
  }

  if (code === 'it') {
    return (
      <svg viewBox="0 0 30 20" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
        <rect width="10" height="20" fill="#009246" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#CE2B37" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-[2px] shadow-sm">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#FFFFFF" strokeWidth="9" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="14" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
};

export const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => (
  <div className="flex items-center gap-1" aria-label="Choisir la langue">
    {languages.map(({ code, name }) => (
      <button
        key={code}
        type="button"
        data-language-button={code}
        onClick={() => onChange(code)}
        className={`flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all ${
          language === code
            ? 'bg-brand-main/15 ring-2 ring-brand-main scale-105'
            : 'opacity-60 hover:bg-gray-100 hover:opacity-100'
        }`}
        aria-label={`Afficher le site en ${name}`}
        aria-pressed={language === code}
        title={name}
      >
        <FlagIcon code={code} />
      </button>
    ))}
  </div>
);
