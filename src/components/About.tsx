import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Target, Code2, LineChart } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Code2, label: "Développement", color: "text-brand-main", bg: "bg-brand-main/10" },
    { icon: Target, label: "Lean Management", color: "text-brand-orange", bg: "bg-brand-orange/10" },
    { icon: LineChart, label: "Amélioration Continue", color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text content */}
          <div>
            <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">
              {t.nav.about}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6">
              {t.about.title}
            </h3>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>

          {/* Visual representations / Bento boxes */}
          <div className="grid gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow"
                >
                  <div className={`p-4 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-brand-dark">
                    {stat.label}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
