import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ExternalLink, FolderGit2 } from 'lucide-react';

export const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-wider text-brand-light uppercase mb-3">
              Portfolio
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              {t.projects.title}
            </h3>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="absolute top-8 right-8">
                {project.link ? (
                  <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 pr-16">
                {project.title}
              </h4>

              {(project as any).image && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5 relative group/img">
                  <img src={(project as any).image} alt={`${project.title} preview`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                </div>
              )}
              
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-brand-light font-medium text-sm">Contexte :</span>
                  <p className="text-gray-300 mt-1">{project.context}</p>
                </div>
                <div>
                  <span className="text-brand-light font-medium text-sm">Mon rôle :</span>
                  <p className="text-gray-300 mt-1">{project.role}</p>
                </div>
                <div>
                  <span className="text-brand-light font-medium text-sm">Résultat :</span>
                  <p className="text-gray-300 mt-1">{project.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
