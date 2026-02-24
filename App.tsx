
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuickContact from './components/QuickContact';
import GeminiChat from './components/GeminiChat';
import CustomCursor from './components/CustomCursor';
import InteractiveNetworkBackground from './components/InteractiveNetworkBackground';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 md:cursor-none transition-colors duration-500">
      <InteractiveNetworkBackground />
      <CustomCursor />

      {/* Custom Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <QuickContact />
      <GeminiChat />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, backgroundColor: '#0891b2' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 p-4 bg-cyan-600 text-white rounded-full shadow-lg shadow-cyan-500/20 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
