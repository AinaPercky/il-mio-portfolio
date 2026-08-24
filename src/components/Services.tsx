import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { MonitorSmartphone, Workflow, Users } from 'lucide-react';

const ICONS = [MonitorSmartphone, Workflow, Users];
const COLORS = [
  'bg-brand-main text-white',
  'bg-brand-dark text-white',
  'bg-brand-yellow text-brand-dark',
];

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">
              Expertise
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark">
              {t.services.title}
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const Icon = ICONS[index];
            const colorClass = COLORS[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${colorClass} transition-transform group-hover:scale-110`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
