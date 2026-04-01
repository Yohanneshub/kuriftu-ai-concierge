import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot, X, Calendar, MapPin, Coffee, Info, MessageSquare, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../lib/data';
import { toast } from 'sonner';

const SUGGESTIONS = [
  { icon: Coffee, text: 'Book Coffee Ceremony' },
  { icon: MapPin, text: 'Explore Lakeside' },
  { icon: MessageSquare, text: 'Room Service' },
];

export const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello Abeba! I'm your Kuriftu AI Concierge. Based on your preferences for luxury and culture, I recommend the Sunrise Coffee Ceremony tomorrow. Would you like me to book that for you?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI Response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      if (!isOpen) {
        toast.info("New message from AI Concierge");
      }
    }, 1000);
  };

  const getAIResponse = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('food') || t.includes('eat') || t.includes('service')) 
      return "I've sent the menu to your digital screen! Would you like me to call our waiter for you?";
    if (t.includes('spa') || t.includes('massage')) 
      return "Excellent choice. We have availability for a Swedish massage at 2:00 PM and 4:30 PM today. Which one works for you?";
    if (t.includes('room') || t.includes('temp')) 
      return "I've adjusted your room temperature to 21\u00b0C as requested. Is there anything else with your room settings?";
    if (t.includes('coffee') || t.includes('ceremony'))
      return "I've added the Sunrise Coffee Ceremony to your itinerary for tomorrow at 7:00 AM. A reminder will be sent to your device.";
    return "I'll look into that right away! Is there anything else I can help you with to make your stay perfect?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            className="bg-amber-600 text-white p-5 rounded-full shadow-2xl flex items-center gap-3 relative overflow-hidden group"
          >
            <Sparkles size={28} />
            <span className="font-bold hidden md:block pr-2">AI Concierge</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '72px' : '600px',
              width: isMinimized ? '320px' : 'min(420px, calc(100vw - 48px))'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-amber-100/50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-amber-600 p-6 text-white flex justify-between items-center shrink-0 cursor-pointer"
                 onClick={() => isMinimized && setIsMinimized(false)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">Kuriftu Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] opacity-80 font-bold">AI ONLINE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={18} /></button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex flex-col gap-1 max-w-[85%]">
                        <div className={`p-4 rounded-3xl text-sm shadow-sm ${
                          m.sender === 'user' 
                            ? 'bg-slate-900 text-white rounded-tr-none' 
                            : 'bg-white border border-amber-100 text-slate-800 rounded-tl-none'
                        }`}>
                          {m.text}
                        </div>
                        <span className={`text-[10px] font-bold text-slate-400 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggestions */}
                <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar">
                  {SUGGESTIONS.map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(s.text)}
                      className="flex-none flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-amber-400 hover:text-amber-600 transition-all"
                    >
                      <s.icon size={14} />
                      {s.text}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-6 pt-2 bg-white">
                  <div className="relative flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-[1.5rem] p-1.5 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your request..."
                      className="flex-1 bg-transparent border-none px-4 py-2 focus:ring-0 outline-none text-sm font-medium"
                    />
                    <button
                      onClick={() => handleSend()}
                      className="p-3 bg-amber-600 text-white rounded-[1.2rem] hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">
                    Secure AI concierge \u2022 Data encrypted
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};