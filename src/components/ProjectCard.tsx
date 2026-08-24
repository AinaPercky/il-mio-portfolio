import type { FC } from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import type { Project } from '../types/content';

interface ProjectCardLabels {
  context: string;
  role: string;
  result: string;
}

interface ProjectCardProps {
  project: Project;
  labels: ProjectCardLabels;
  onHover: (element: HTMLElement, hovered: boolean) => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, labels, onHover }: ProjectCardProps) => (
  <article
    data-card
    onMouseEnter={(event) => onHover(event.currentTarget, true)}
    onMouseLeave={(event) => onHover(event.currentTarget, false)}
    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-colors"
  >
    <div className="absolute top-8 right-8">
      {project.link ? (
        <a
          href={`https://${project.link}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir le projet ${project.title}`}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      ) : (
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50" aria-hidden="true">
          <FolderGit2 className="w-5 h-5" />
        </div>
      )}
    </div>

    <h4 className="text-2xl font-bold text-white mb-4 pr-16">{project.title}</h4>

    <div className="space-y-4 mb-8">
      <div>
        <span className="text-brand-light font-medium text-sm">{labels.context}</span>
        <p className="text-gray-300 mt-1">{project.context}</p>
      </div>
      <div>
        <span className="text-brand-light font-medium text-sm">{labels.role}</span>
        <p className="text-gray-300 mt-1">{project.role}</p>
      </div>
      <div>
        <span className="text-brand-light font-medium text-sm">{labels.result}</span>
        <p className="text-gray-300 mt-1">{project.result}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      {project.stack.map((technology) => (
        <span key={technology} className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
          {technology}
        </span>
      ))}
    </div>
  </article>
);
