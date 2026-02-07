
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#080c14] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-wider text-cyan-400 uppercase mb-2"
            >
              Let's Talk
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 text-white"
            >
              Get in Touch
            </motion.h3>
            <p className="text-slate-400 mb-10 text-lg">
              Have a project in mind? Looking to hire a skilled developer? Let's connect and build something amazing together.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: <Mail size={20} />, label: 'Email', value: 'nnamadushan@gmail.com' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+94 71 777 5812' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Matara, Sri Lanka' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-950 text-cyan-400 rounded-2xl flex items-center justify-center border border-cyan-400/10">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.label}</div>
                    <div className="font-semibold text-slate-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[<Github />, <Linkedin />, <Twitter />].map((icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-slate-900 text-slate-400 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-colors border border-white/5"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0c1529] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#050b18] border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-600 transition-all peer placeholder-transparent"
                  />
                  <label className="absolute left-6 -top-3 px-1 bg-[#0c1529] text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400">
                    Your Name
                  </label>
                </div>
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#050b18] border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-600 transition-all peer placeholder-transparent"
                  />
                  <label className="absolute left-6 -top-3 px-1 bg-[#0c1529] text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400">
                    Email Address
                  </label>
                </div>
              </div>
              <div className="group relative mb-10">
                <textarea
                  rows={5}
                  placeholder="How can I help?"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#050b18] border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-600 transition-all peer placeholder-transparent resize-none"
                />
                <label className="absolute left-6 -top-3 px-1 bg-[#0c1529] text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400">
                  Your Message
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isSent ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'} text-white shadow-xl shadow-cyan-600/20`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSent ? (
                  <>Sent Successfully! ✅</>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
