
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Compass, ExternalLink, ArrowRight } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';
import { Certification } from '../types';

type CertificationFilter = 'all' | 'mobile' | 'ai/ml' | 'web development' | 'devops';

const FILTER_OPTIONS: { label: string; value: CertificationFilter }[] = [
  { label: 'All Certificates', value: 'all' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'AI/ML', value: 'ai/ml' },
  { label: 'Web Development', value: 'web development' },
  { label: 'DevOps', value: 'devops' },
];

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeFilter, setActiveFilter] = useState<CertificationFilter>('all');
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (filter: CertificationFilter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  const filteredCertifications = CERTIFICATIONS.filter((cert) => {
    if (activeFilter === 'all') {
      return true;
    }

    return cert.categories.includes(activeFilter);
  });

  const visibleCertifications = showAll ? filteredCertifications : filteredCertifications.slice(0, 8);

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
                  ? 'bg-purple-500 text-slate-950 border-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.25)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-purple-400/40 hover:text-purple-300'
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {visibleCertifications.map((cert, idx) => (
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

        {!showAll && filteredCertifications.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-white rounded-full font-bold uppercase tracking-[0.3em] text-[11px] transition-all transform hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(168,85,247,0.05)]"
            >
              <span>More Certifications</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-purple-400" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Holographic Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            <motion.div
              layoutId={selectedCert.id}
              className="relative w-full max-w-7xl bg-[#0a0f1e] rounded-[1.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl z-10 flex flex-col md:flex-row h-full max-h-[95vh] md:max-h-[85vh]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/80 hover:bg-purple-600 text-white rounded-full transition-all border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/80"
              >
                <X size={24} />
              </button>

              {/* Left Side: Credential Image */}
              <div className="w-full md:w-[60%] h-[40vh] md:h-auto shrink-0 overflow-hidden relative bg-black/20 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain p-2 md:p-8"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-[40%] p-6 md:p-12 lg:p-16 flex-1 overflow-y-auto custom-scrollbar bg-[#0a0f1e]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500/20 text-purple-400 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center border border-purple-500/30">
                    <Award size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-black text-purple-400 uppercase tracking-[0.3em]">{selectedCert.issuer}</p>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Authorized Credential</p>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold mb-8 text-white leading-tight tracking-tight">{selectedCert.title}</h3>

                <p className="text-slate-400 mb-10 leading-relaxed text-base md:text-xl italic font-medium">
                  "{selectedCert.description}"
                </p>

                <div className="flex flex-col gap-4">
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/5 mb-6">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Issue Date</div>
                    <div className="text-lg font-bold text-white">{selectedCert.date}</div>
                  </div>

                  {selectedCert.link && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-5 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3"
                    >
                      <ExternalLink size={18} />
                      Verify Credential
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-full py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest text-[10px]"
                  >
                    Close View
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
