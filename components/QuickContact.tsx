import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MessageCircle, MessageSquare, X } from 'lucide-react';

type QuickContactProps = {
  isChatOpen: boolean;
  onToggleChat: () => void;
};

const QuickContact: React.FC<QuickContactProps> = ({ isChatOpen, onToggleChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = '94717775812';
  const emailAddress = 'nnamadushan@gmail.com';

  const actions = [
    {
      icon: <MessageCircle size={24} />,
      href: `https://wa.me/${whatsappNumber}`,
      color: 'from-[#25D366] to-[#1fb958]',
      label: 'WhatsApp',
    },
    {
      icon: <Mail size={24} />,
      href: `mailto:${emailAddress}`,
      color: 'from-cyan-500 to-sky-600',
      label: 'Email',
    },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  const handleChatClick = () => {
    onToggleChat();
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[65] flex flex-col items-end gap-4"
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="flex flex-col items-end gap-4"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.7, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 18 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.08, x: -4 }}
                whileTap={{ scale: 0.92 }}
                className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${action.color} text-white shadow-xl shadow-cyan-900/35 md:h-16 md:w-16`}
                aria-label={action.label}
                onClick={() => setIsMenuOpen(false)}
              >
                {action.icon}
                <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-xl border border-white/10 bg-slate-950/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {action.label}
                </span>
              </motion.a>
            ))}

            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: 18 }}
              transition={{ delay: actions.length * 0.06 }}
              whileHover={{ scale: 1.08, x: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleChatClick}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xl shadow-cyan-900/35 md:h-16 md:w-16"
              aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
            >
              <MessageSquare size={24} />
              <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-xl border border-white/10 bg-slate-950/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {isChatOpen ? 'Close Chat' : 'AI Chat'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-700 text-white shadow-2xl shadow-cyan-950/50 ring-1 ring-white/10"
        aria-label={isMenuOpen ? 'Close quick contact menu' : 'Open quick contact menu'}
      >
        {isMenuOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default QuickContact;
