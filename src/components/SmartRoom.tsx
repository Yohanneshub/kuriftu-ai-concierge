import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Music, Thermometer, Moon, Sun, Coffee, Heart, Volume2, Power, Wifi, ShieldCheck, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { toast } from 'sonner';

const MODES = [
  { id: 'relax', name: 'Relax', icon: Moon, color: 'bg-indigo-900', text: 'Dimming lights & playing soft jazz...', preset: 20 },
  { id: 'morning', name: 'Morning', icon: Sun, color: 'bg-amber-400', text: 'Opening curtains & suggesting breakfast...', preset: 23 },
  { id: 'romantic', name: 'Romantic', icon: Heart, color: 'bg-rose-600', text: 'Setting warm lighting & wine service...', preset: 21 },
  { id: 'work', name: 'Work', icon: Coffee, color: 'bg-slate-700', text: 'Optimizing desk lighting & quiet mode...', preset: 22 },
];

export const SmartRoom = () => {
  const [activeMode, setActiveMode] = useState('morning');
  const [temp, setTemp] = useState(22);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [volume, setVolume] = useState(65);

  const handleModeChange = (mode: typeof MODES[0]) => {
    if (!isPowerOn) return;
    setActiveMode(mode.id);
    setTemp(mode.preset);
    toast.success(mode.text);
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col h-full relative group overflow-hidden transition-all duration-500 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-500/10 transition-colors" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/10">
             <Zap size={28} className="text-amber-400" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">Smart Suite</h2>
            <div className="flex items-center gap-2 mt-1 font-bold text-xs uppercase tracking-widest text-slate-400">
               <ShieldCheck size={14} className="text-emerald-500" />
               Secured System
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => { 
            setIsPowerOn(!isPowerOn); 
            toast.info(isPowerOn ? 'System powering down...' : 'System initialized'); 
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPowerOn 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-lg shadow-emerald-500/10' 
            : 'bg-rose-50 text-rose-600 border border-rose-100 shadow-lg shadow-rose-500/10'}`}
        >
          <Power size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isPowerOn ? (
          <motion.div
            key="on"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-10 flex-1"
          >
            {/* Preset Modes Grid */}
            <div className="grid grid-cols-2 gap-4">
              {MODES.map((mode) => (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleModeChange(mode)}
                  className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] transition-all border shadow-sm ${activeMode === mode.id 
                    ? `${mode.color} text-white border-transparent shadow-xl shadow-slate-900/10` 
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-amber-200 hover:text-amber-600'}`}
                >
                  <mode.icon size={32} />
                  <span className="text-xs font-black uppercase tracking-widest">{mode.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Climate & Volume Controls */}
            <div className="space-y-10">
              <div className="space-y-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center justify-between px-2 font-bold">
                  <div className="flex items-center gap-3 text-slate-400 uppercase tracking-widest text-xs">
                    <Thermometer size={18} className="text-amber-500" />
                    Climate
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setTemp(t => Math.max(16, t - 1))} 
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl font-bold hover:border-amber-400 transition-colors"
                    >-</button>
                    <span className="font-black text-2xl w-10 text-center text-slate-900">{temp}\u00b0</span>
                    <button 
                      onClick={() => setTemp(t => Math.min(30, t + 1))} 
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl font-bold hover:border-amber-400 transition-colors"
                    >+</button>
                  </div>
                </div>
                
                <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: '50%' }}
                    animate={{ width: `${((temp - 16) / 14) * 100}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center justify-between px-2 font-bold">
                   <div className="flex items-center gap-3 text-slate-400 uppercase tracking-widest text-xs">
                    <Volume2 size={18} className="text-indigo-500" />
                    Volume
                  </div>
                  <span className="text-xl font-black text-slate-900">{volume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 shadow-inner"
                />
              </div>
            </div>

            {/* AI Suggestion Alert */}
            <div className="flex items-center gap-4 p-5 bg-indigo-900 text-white rounded-[2rem] shadow-xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shrink-0">
                <Sparkles size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs leading-relaxed opacity-80">
                  AI Suggestion: Lowering temp to 20\u00b0C between 11 PM - 6 AM improves deep sleep quality by 24%.
                </p>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                 <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-200">
               <Wifi size={40} className="text-slate-200" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-400 mb-2">Suite Offline</h3>
              <p className="text-sm text-slate-300 font-medium max-w-xs">Your smart suite controls are currently powered down. Tap the power icon above to initialize.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};