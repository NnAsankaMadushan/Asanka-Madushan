
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

type ProjectFilter = 'mobile' | 'web' | 'ui/ux' | 'ai/ml' | 'all';

const hasProjectPlatform = (project: Project, platform: 'mobile' | 'web') => {
  if (project.platforms?.length) {
    return project.platforms.includes(platform);
  }

  if (platform === 'mobile') {
    return project.category === 'Mobile App';
  }

  return project.category === 'Web Application';
};

const isMobileProject = (project: Project) => hasProjectPlatform(project, 'mobile');
const isWebProject = (project: Project) => hasProjectPlatform(project, 'web');
const isDualPlatformProject = (project: Project) => isMobileProject(project) && isWebProject(project);

const getProjectRepositoryLink = (project: Project, activeFilter: ProjectFilter) => {
  const preferredPlatform = activeFilter === 'mobile' ? 'mobile' : 'web';
  return project.repositoryLinks?.[preferredPlatform] || project.link;
};

const getProjectRepositoryLabel = (project: Project, activeFilter: ProjectFilter) => {
  if (activeFilter === 'mobile' && project.repositoryLinks?.mobile) {
    return 'Mobile Git Repository';
  }

  if (project.repositoryLinks?.web) {
    return 'Web Git Repository';
  }

  return 'Git Repository';
};

const FILTER_OPTIONS: { label: string; value: ProjectFilter }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Mobile Projects', value: 'mobile' },
  { label: 'Web Projects', value: 'web' },
  { label: 'AI/ML Projects', value: 'ai/ml' },
  { label: 'UI/UX Design', value: 'ui/ux' },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  const filteredProjects = [...PROJECTS]
    .filter((project) => {
      if (activeFilter === 'mobile') {
        return isMobileProject(project);
      }

      if (activeFilter === 'web') {
        return isWebProject(project);
      }

      if (activeFilter === 'ui/ux') {
        return project.category === 'UI/UX Design';
      }

      if (activeFilter === 'ai/ml') {
        return (
          ['IoT Security', 'Machine Learning'].includes(project.category) ||
          project.tags.some((tag) =>
            ['Machine Learning', 'AI', 'NLP', 'Computer Vision'].some((keyword) => tag.includes(keyword))
          )
        );
      }

      return true;
    })
    .sort((a, b) => {
      const getPriority = (project: Project) => {
        if (isDualPlatformProject(project)) return 0;
        if (isMobileProject(project)) return 1;
        if (isWebProject(project)) return 2;
        return 3;
      };

      return getPriority(a) - getPriority(b);
    });

  const selectedProjectRepositoryLink = selectedProject
    ? getProjectRepositoryLink(selectedProject, activeFilter)
    : '#';
  const selectedProjectRepositoryLabel = selectedProject
    ? getProjectRepositoryLabel(selectedProject, activeFilter)
    : 'Git Repository';

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase">My Projects</span>
            <div className="h-[1px] w-8 bg-cyan-400" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Featured Work
          </motion.h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFilterChange(option.value)}
                className={`px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all border ${isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-cyan-300'
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-stretch">
          {filteredProjects.slice(0, showAll ? undefined : 6).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              onClick={() => setSelectedProject(project)}
              className="group h-full cursor-pointer backdrop-blur-md bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                <div className="absolute top-6 left-6 z-10 flex gap-2">
                  <span className="whitespace-nowrap rounded-full border border-cyan-300/45 bg-[#04153a] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100 shadow-[0_10px_24px_rgba(4,21,58,0.45)]">

                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-1 flex-col">
                <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                <p className="text-slate-400 mb-6 md:mb-8 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {project.tags.slice(0, 5).map(tag => (
                    <span key={tag} className="text-[10px] px-3 py-1.5 bg-white/5 border border-white/10 text-slate-500 rounded-lg font-bold uppercase tracking-tighter group-hover:border-cyan-400/20 group-hover:text-slate-300 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center text-cyan-400 font-bold text-xs uppercase tracking-[0.2em]">
                    <span>Analysis</span>
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Layers size={18} className="text-slate-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-white rounded-full font-bold uppercase tracking-[0.3em] text-[11px] transition-all transform hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(34,211,238,0.05)]"
            >
              <span>More Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Futuristic Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div
              layoutId={selectedProject.id}
              className="relative w-full max-w-7xl bg-[#0a0f1e] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] z-10 flex flex-col md:flex-row h-full max-h-[95vh] md:max-h-[85vh] border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/80 hover:bg-cyan-500 text-white rounded-full transition-all border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/80"
              >
                <X size={24} />
              </button>

              {/* Left Side: Media */}
              <div className="w-full md:w-[60%] h-[45vh] md:h-auto bg-black/40 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                {selectedProject.embedUrl ? (
                  <iframe
                    src={selectedProject.embedUrl}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-[40%] flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#0a0f1e]">
                <div className="p-6 md:p-10 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-[1px] w-6 bg-cyan-500" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em]">{selectedProject.category}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-6">{selectedProject.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 uppercase">{tag}</span>
                    ))}
                  </div>

                  <p className="text-slate-400 leading-relaxed text-base md:text-lg font-medium mb-10">
                    {selectedProject.longDescription}
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {selectedProject.stats.map(stat => (
                      <div key={stat.label} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group/stat hover:border-cyan-500/30 transition-all">
                        <div>
                          <div className="text-lg font-black text-cyan-400 mb-0.5">{stat.value}</div>
                          <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
                        </div>
                        <Layers size={18} className="text-slate-800" />
                      </div>
                    ))}
                  </div>

                  <a
                    href={selectedProjectRepositoryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-cyan-600 text-white text-center font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-600/20 uppercase tracking-widest text-xs"
                  >
                    <ExternalLink size={18} />
                    {selectedProjectRepositoryLabel}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
