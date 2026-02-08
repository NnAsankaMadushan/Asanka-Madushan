
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Linkedin, Github, Facebook, Youtube, Instagram } from 'lucide-react';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse position for background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glow
  const springConfig = { damping: 50, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const socials = [
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/asanka-madushan-84ba73211" },
    { icon: <Github size={20} />, href: "https://github.com/NnAsankaMadushan" },
    { icon: <Facebook size={20} />, href: "https://web.facebook.com/profile.php?id=100005216388114" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@aSaBytes" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/asa___nka/" },
  ];

  const titleText = "Asanka Madushan";

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Background Glow - Mouse Follower (Reduced Radius) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.15), transparent 80%)`
          )
        }}
      />

      <motion.div
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-24 relative z-10"
      >
        {/* Profile Image with Cosmic Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-tr from-gray-100 via-white to-gray-200">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-[#0a0f1e]">
              <img
                src="/images/profile.png"
                alt="Asanka Madushan"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl -z-10" />
        </motion.div>

        {/* Hero Text Content */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight overflow-hidden">
            <span className="block text-slate-400 text-xl md:text-4xl mb-2">Hello, I'm</span>
            <span className="flex flex-wrap justify-center md:justify-start">
              {titleText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.03), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-slate-400 text-base md:text-xl leading-relaxed mb-8 md:mb-10 font-medium"
          >
            I am an Electrical and Information Engineering undergraduate at the <span className="text-white">University of Ruhuna</span>.
            Passionate about full-stack development, I work with React, Node.js, Python, Flutter, React Native, Figma, and n8n Automation.
            I also explore machine learning and UI/UX design to create innovative digital solutions.
          </motion.p>

          {/* Magnetic Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-5">
            {socials.map((social, idx) => (
              <Magnetic key={idx}>
                <motion.a
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + (idx * 0.1) }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -150]) }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full blur-[1px] opacity-40"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
        className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] opacity-20"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full -z-10 opacity-20 pointer-events-none" />
    </section>
  );
};

export default Hero;
