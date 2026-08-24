import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Technical Skills */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold tracking-wider text-brand-main uppercase mb-3">
                Expertise
              </h2>
              <h3 className="text-3xl font-bold text-brand-dark">
                {t.skills.title}
              </h3>
            </motion.div>

            <div className="space-y-8">
              {t.skills.categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-brand-dark mb-4 border-b border-gray-100 pb-2">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {category.list.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-50 text-brand-dark font-medium rounded-xl border border-gray-100 hover:border-brand-main hover:text-brand-main transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold tracking-wider text-brand-orange uppercase mb-3">
                Soft Skills
              </h2>
              <h3 className="text-3xl font-bold text-brand-dark">
                {t.softSkills.title}
              </h3>
            </motion.div>

            <div className="space-y-6">
              {t.softSkills.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex space-x-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-main" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-dark mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
