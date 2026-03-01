
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';

const QuickContact: React.FC = () => {
    const whatsappNumber = "+94717775812";
    const emailAddress = "nnamadushan@gmail.com";

    const actions = [
        {
            icon: <MessageCircle size={24} />,
            href: `https://wa.me/${whatsappNumber}`,
            color: 'bg-[#25D366]',
            label: 'WhatsApp',
            delay: 0.1
        },
        {
            icon: <Mail size={24} />,
            href: `mailto:${emailAddress}`,
            color: 'bg-cyan-600',
            label: 'Email',
            delay: 0.2
        }
    ];

    return (
        <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-[60] flex flex-col gap-4">
            {actions.map((action, index) => (
                <motion.a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: action.delay }}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${action.color} text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl shadow-cyan-600/20 flex items-center justify-center hover:brightness-110 transition-all group relative`}
                >
                    {action.icon}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-white/10 shadow-2xl">
                        {action.label}
                    </span>
                </motion.a>
            ))}
        </div>
    );
};

export default QuickContact;
