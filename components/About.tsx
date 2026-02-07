
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, GraduationCap } from 'lucide-react';
import { SKILLS, EXPERIENCES, EDUCATION, SPECIALIZATIONS } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-40 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-transparent" />
            <span className="text-sm font-bold tracking-[0.5em] text-purple-400 uppercase">Exploration</span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black text-white tracking-tight"
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Column 1: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 p-12 rounded-[3rem] border border-white/10 shadow-2xl group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-500">
                <Code2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Technical Skills</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.map((skill) => (
                <motion.div 
                  key={skill.name}
                  whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                  className="bg-white/5 backdrop-blur-sm flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/5 transition-all"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {skill.icon.startsWith('http') ? (
                      <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <span className="text-xl">{skill.icon}</span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Experience */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 p-12 rounded-[3rem] border border-white/10 shadow-2xl group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-500">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Experience</h3>
            </div>

            <div className="space-y-12 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative pl-10 group/item">
                  <div className="absolute left-0 top-[8px] w-[15px] h-[15px] rounded-full bg-cyan-400 border-4 border-[#020617] z-10 transition-transform group-hover/item:scale-125" />
                  <h4 className="font-bold text-white text-lg mb-1">{exp.role}</h4>
                  <p className="text-sm text-slate-400 mb-2 leading-relaxed italic">{exp.company}</p>
                  <span className="text-[10px] font-black text-cyan-500/80 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 p-12 rounded-[3rem] border border-white/10 shadow-2xl group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Education</h3>
            </div>

            <div className="space-y-10">
               <div className="relative pl-10">
                  <div className="absolute left-0 top-[8px] w-[15px] h-[15px] rounded-full bg-indigo-400 border-4 border-[#020617] z-10" />
                  <h4 className="font-bold text-white text-lg mb-1">{EDUCATION.degree}</h4>
                  <p className="text-sm text-slate-400 mb-1">{EDUCATION.field}</p>
                  <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest">{EDUCATION.university}</p>
                </div>

                <div className="mt-12">
                  <h4 className="font-black text-white text-xs uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALIZATIONS.map(spec => (
                      <span key={spec} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 uppercase hover:bg-white/10 transition-colors">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
