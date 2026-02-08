
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer backdrop-blur-md bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-[10px] font-bold text-cyan-300 rounded-full uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                <p className="text-slate-400 mb-6 md:mb-8 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-3 py-1.5 bg-white/5 border border-white/10 text-slate-500 rounded-lg font-bold uppercase tracking-tighter group-hover:border-cyan-400/20 group-hover:text-slate-300 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
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
      </div>

      {/* Futuristic Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              layoutId={selectedProject.id}
              className="relative w-full max-w-5xl bg-[#0a0f1e] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] z-10 flex flex-col max-h-[90vh] border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-white/5 hover:bg-cyan-500 text-white rounded-full transition-all border border-white/10 backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="px-6 pt-6 pb-2 md:px-12 md:pt-10 md:pb-4 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="h-[1px] w-6 bg-cyan-500" />
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em]">{selectedProject.category}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight pr-12">{selectedProject.title}</h3>
              </div>

              <div className="w-full aspect-video shrink-0 bg-black/40 flex items-center justify-center overflow-hidden border-y border-white/5">
                {selectedProject.video ? (
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

              <div className="w-full p-6 md:p-12 overflow-y-auto custom-scrollbar flex-1 bg-[#0a0f1e]">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 uppercase">{tag}</span>
                      ))}
                    </div>
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg font-medium">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                      {selectedProject.stats.map(stat => (
                        <div key={stat.label} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                          <div>
                            <div className="text-lg font-black text-cyan-400 mb-0.5">{stat.value}</div>
                            <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a
                      href={selectedProject.link}
                      className="w-full py-4 bg-cyan-600 text-white text-center font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-600/20 uppercase tracking-widest text-xs"
                    >
                      <ExternalLink size={18} />
                      Git Repository
                    </a>
                  </div>
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
