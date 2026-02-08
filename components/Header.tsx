
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import Magnetic from './Magnetic';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl py-4 border-b border-black/5 dark:border-white/5 shadow-2xl' : 'bg-transparent py-6 md:py-10'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Magnetic strength={0.2}>
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer group"
          >
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-[0.1em] uppercase">
              Asanka
            </span>
          </motion.a>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.3}>
              <a
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all relative group py-2"
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300"
                />
              </a>
            </Magnetic>
          ))}

          <div className="flex items-center gap-4">
            <Magnetic strength={0.4}>
              <motion.a
                href="/Asanka_Madushan.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-xs font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-xl shadow-cyan-500/5"
              >
                <Download size={14} />
                CV
              </motion.a>
            </Magnetic>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-slate-900 dark:text-white p-2 relative z-[60]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[55] w-full h-screen bg-white/98 dark:bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/Asanka_Madushan.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 flex items-center gap-3 px-8 py-4 bg-cyan-600 text-white font-black rounded-2xl uppercase tracking-[0.2em]"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
