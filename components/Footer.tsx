
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-4 md:mb-0 uppercase tracking-widest">
          ASANKA.DEV
        </div>
        <div className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} Asanka Madushan. Built for Excellence.
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
