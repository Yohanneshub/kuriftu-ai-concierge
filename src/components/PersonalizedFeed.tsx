import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, ArrowRight, Heart, Compass, Coffee, Utensils, Waves, Clock, CheckCircle2 } from 'lucide-react';
import { ACTIVITIES, Activity } from '../lib/data';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'all', label: 'All Experiences', icon: Compass },
  { id: 'culture', label: 'Culture', icon: Coffee },
  { id: 'dining', label: 'Dining', icon: Utensils },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'adventure', label: 'Adventure', icon: Waves },
];

export const PersonalizedFeed = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [booked, setBooked] = useState<string[]>([]);

  const filteredActivities = activeCategory === 'all' 
    ? ACTIVITIES 
    : ACTIVITIES.filter(a => a.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    if (!favorites.includes(id)) {
      toast.success('Saved to your sanctuary');
    }
  };

  const handleBook = (activity: Activity) => {
    if (booked.includes(activity.id)) return;
    
    setBooked(prev => [...prev, activity.id]);
    toast.success(`${activity.title} booked successfully!`, {
      description: `We'll see you at ${activity.duration} for the experience.`,
    });
  };

  return (
    <div className="space-y-10">
      {/* Header & Filter */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full text-amber-600 font-black text-[10px] uppercase tracking-widest mb-3 border border-amber-100">
               <Sparkles size={12} />
               AI Personalized Selection
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Your Next <br className="sm:hidden" />Journey.</h2>
            <p className="text-slate-400 font-medium text-sm mt-2 max-w-sm">
              AI-curated experiences based on your interest in <span className="text-amber-600">Ethiopian Culture</span> and <span className="text-amber-600">Wellness</span>.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">
            See All Discovery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all border ${cat.id === activeCategory 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-amber-200 hover:text-amber-600'}`}
            >
              <cat.icon size={18} />
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, idx) => (
            <motion.div
              layout
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-amber-600 flex items-center gap-2 shadow-xl">
                    <Sparkles size={14} />
                    {activity.matchScore}% Match
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(activity.id); }}
                  className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-all ${favorites.includes(activity.id) 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-white/90 text-slate-400 hover:text-rose-500 shadow-xl'}`}
                >
                  <Heart size={20} fill={favorites.includes(activity.id) ? "currentColor" : "none"} />
                </button>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                   <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                      <Clock size={16} className="text-amber-400" />
                      {activity.duration}
                   </div>
                   <div className="text-2xl font-black">{activity.price}</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-2xl text-slate-900 leading-tight mb-2">{activity.title}</h3>
                    <div className="flex items-center gap-1.5 text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                      <span className="text-xs font-black ml-2 text-slate-400 uppercase tracking-widest">Top Rated</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">{activity.description}</p>
                
                <button 
                  onClick={() => handleBook(activity)}
                  disabled={booked.includes(activity.id)}
                  className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-slate-900/10 ${booked.includes(activity.id) 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl'}`}
                >
                  {booked.includes(activity.id) ? (
                    <>
                      <CheckCircle2 size={20} />
                      EXPERIENCE BOOKED
                    </>
                  ) : (
                    <>
                      BOOK EXPERIENCE
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};