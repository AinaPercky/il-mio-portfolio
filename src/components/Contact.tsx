import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimeReveal } from '../hooks/useAnimeReveal';
import { buildMailtoUrl } from '../lib/mailto';

const CONTACT_EMAIL = 'ainapercky@gmail.com';

export const Contact = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const root = useRef<HTMLElement | null>(null);
  useAnimeReveal({ root, staggerDelay: 100 });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const subject = trimmedName ? `${t.labels.mailSubject} — ${trimmedName}` : t.labels.mailSubject;
    const body = [
      `${t.labels.mailName} : ${trimmedName}`,
      `${t.labels.mailEmail} : ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');

    window.location.href = buildMailtoUrl({
      recipient: CONTACT_EMAIL,
      subject,
      body,
    });
  };

  return (
    <section ref={root} id="contact" className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-16 shadow-sm border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark mb-6 leading-tight">{t.contact.title}</h2>
              <p className="text-xl text-gray-600 mb-12 max-w-lg">{t.contact.text}</p>

              <div className="space-y-8">
                <a href={`mailto:${t.contact.email}`} className="flex items-center space-x-4 text-brand-dark hover:text-brand-main transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-brand-main/10 flex items-center justify-center group-hover:bg-brand-main group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-medium">{t.contact.email}</span>
                </a>

                <a href={`tel:${t.contact.phone}`} className="flex items-center space-x-4 text-brand-dark hover:text-brand-main transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-brand-main/10 flex items-center justify-center group-hover:bg-brand-main group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-medium">{t.contact.phone}</span>
                </a>

                <div className="flex items-center space-x-4 text-brand-dark group cursor-default">
                  <div className="w-14 h-14 rounded-full bg-brand-main/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-medium">{t.contact.location}</span>
                </div>
              </div>
            </div>

            <div data-reveal className="bg-brand-dark rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-main/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

              <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">{t.labels.name}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-all"
                    placeholder={t.labels.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">{t.labels.email}</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-all"
                    placeholder={t.labels.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">{t.labels.message}</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-all resize-none"
                    placeholder={t.labels.messagePlaceholder}
                  />
                </div>
                <button type="submit" className="w-full bg-brand-orange hover:bg-[#e67a00] text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
                  {t.labels.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
