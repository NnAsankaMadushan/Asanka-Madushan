
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Compass } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';
import { Certification } from '../types';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-24">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={18} className="text-purple-400 animate-spin-slow" />
              <span className="text-sm font-bold tracking-[0.3em] text-purple-400 uppercase">My Qualifications</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">Certifications & Achievements</h3>
          </div>
          <p className="max-w-md text-slate-400 font-medium text-base md:text-lg border-l-2 border-purple-500/50 pl-6">
            Continuous learning and professional development are key to my growth. Here are the certifications I've earned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer backdrop-blur-md bg-white/5 p-6 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="px-2 pb-2 md:px-4 md:pb-4">
                <div className="flex items-center gap-2 mb-4 text-[9px] md:text-[10px] font-black text-purple-400 bg-purple-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit uppercase tracking-widest">
                  <Calendar size={12} />
                  <span>Stardate {cert.date}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold leading-tight text-white group-hover:text-purple-400 transition-colors mb-3 md:mb-4">{cert.title}</h4>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Holographic Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            <motion.div
              layoutId={selectedCert.id}
              className="relative w-full max-w-5xl bg-[#0a0f1e] rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 md:p-3 bg-black/50 hover:bg-purple-600 text-white rounded-full transition-all border border-white/10 backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="h-[30vh] md:h-[50vh] shrink-0 overflow-hidden relative bg-black/20">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 md:p-12 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500/20 text-purple-400 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center border border-purple-500/30">
                    <Award size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-black text-purple-400 uppercase tracking-[0.3em]">{selectedCert.issuer}</p>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Quantum Verified</p>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-white leading-tight tracking-tight">{selectedCert.title}</h3>

                <p className="text-slate-400 mb-6 md:mb-8 leading-relaxed text-base md:text-xl italic font-medium">
                  "{selectedCert.description}"
                </p>

                <div className="flex gap-6">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 px-8 py-4 md:px-12 md:py-6 bg-purple-600 text-white font-bold rounded-[1.5rem] md:rounded-[2rem] hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-xs md:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
