import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type GeminiChatProps = {
  isOpen: boolean;
  onToggle: () => void;
  showLauncher?: boolean;
};

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onToggle, showLauncher = true }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Asanka's AI assistant. Ask me anything about his engineering skills or projects!" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction =
        'You are an AI assistant for Asanka Madushan, an Electrical and Information Engineering student. Expertise: Web (React, Node, Tailwind), Mobile (React Native, Flutter), ML. Education: University of Ruhuna. Tone: Professional, technical, helpful. Keep answers concise.';

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: userMessage }] }],
        config: {
          systemInstruction,
        },
      });

      const botText = response.text || "I'm sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: 'bot', text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Oops! My brain is a bit fuzzy right now. Try again later!' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const panelBottomClass = showLauncher ? 'bottom-20' : 'bottom-24';

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute ${panelBottomClass} -right-2 md:right-0 h-[500px] w-[calc(100vw-3rem)] overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0c1529] shadow-2xl sm:w-[350px] md:w-[400px]`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between bg-cyan-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">AI Assistant</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={onToggle} className="rounded-lg p-1 hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6 scroll-smooth">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                        message.role === 'user'
                          ? 'rounded-tr-none bg-cyan-600 text-white'
                          : 'rounded-tl-none border border-slate-800 bg-[#050b18] text-slate-200'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl rounded-tl-none border border-slate-800 bg-[#050b18] p-4">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    className="w-full rounded-xl border border-slate-800 bg-[#050b18] px-4 py-3 pr-12 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-1.5 rounded-lg p-2 text-cyan-400 transition-all hover:bg-cyan-900/30"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showLauncher && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-600/30 transition-colors hover:bg-cyan-700"
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </motion.button>
      )}
    </div>
  );
};

export default GeminiChat;
