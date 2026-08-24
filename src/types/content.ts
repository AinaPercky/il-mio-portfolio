import type fr from '../i18n/locales/fr.json';

export type Language = 'fr' | 'en' | 'mg' | 'it';
export type Translations = typeof fr;
export type SupportedLanguage = Extract<Language, 'fr' | 'it' | 'en'>;
export type Project = Translations['projects']['items'][number] & { link?: string };
export type Service = Translations['services']['items'][number];
export type SkillCategory = Translations['skills']['categories'][number];
export type SoftSkill = Translations['softSkills']['items'][number];

export interface NavLink {
  href: string;
  label: string;
}
