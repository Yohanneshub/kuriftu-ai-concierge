import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  Layers,
  Activity,
  BarChart3,
  Coffee,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { REVENUE_DATA, SENTIMENT_DATA, ACTIVITIES } from '../lib/data';
import { SmartRoom } from './SmartRoom';
import { PersonalizedFeed } from './PersonalizedFeed';
import { AdminDashboard } from './AdminDashboard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MasterView = () => {
  return (
    <div className="space-y-12 pb-24">
      {/* Global Command Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-100 shadow-sm">
            <Layers size={12} />
            Unified Resort Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Resort <span className="text-amber-600">Command.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2 max-w-2xl">
            Real-time synchronization of guest satisfaction, operational efficiency, and revenue optimization.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-xl flex items-center gap-4 border border-slate-800">
             <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white">
               <ShieldCheck size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
               <p className="text-sm font-bold uppercase">Optimal</p>
             </div>
           </div>
           <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <Calendar size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Period</p>
               <p className="text-sm font-bold uppercase text-slate-900">August 2024</p>
             </div>
           </div>
        </div>
      </div>

      {/* Intelligence Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Live Occupancy', value: '94.2%', trend: '+5.4%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Daily Revenue', value: '$11,200', trend: '+18.2%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Sentiment Score', value: '98/100', trend: '+12%', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Staff Efficiency', value: '82%', trend: '-2.1%', icon: Zap, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white p-7 rounded-[2.5rem] border ${stat.border} shadow-sm group hover:shadow-2xl transition-all duration-500 cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Section: Guest Journey Preview */}
        <div className="xl:col-span-8 space-y-12">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Guest Journey Intelligence</h2>
              <p className="text-sm text-slate-400 font-medium">Live view of personalized experiences and discovery</p>
            </div>
            <button className="text-amber-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
              Guest Portal <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-white rounded-[3.5rem] p-4 border border-slate-100 shadow-sm">
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden group mb-8">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/kuriftu-resort-aerial-view-6f4b2155-1774531417194.webp"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="Resort Overview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black mb-4">
                  <Sparkles size={14} />
                  AI PERFORMANCE PREDICTION
                </div>
                <h3 className="text-4xl font-black text-white leading-tight">Cultural Dining Demand <br /><span className="text-amber-400">up by 42%</span> this weekend.</h3>
                <div className="flex gap-4 mt-6">
                   <div className="flex items-center gap-2 text-white/80 font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                      <Clock size={16} className="text-amber-400" />
                      Next Peak: 7:00 PM
                   </div>
                   <div className="flex items-center gap-2 text-white/80 font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                      <MapPin size={16} className="text-amber-400" />
                      Lakeside Area
                   </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
               <PersonalizedFeed />
            </div>
          </div>

          {/* Revenue Intelligence Section */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Intelligence</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">AI-Optimized dynamic pricing performance</p>
               </div>
               <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1">
                 <button className="px-5 py-2 rounded-xl text-xs font-bold bg-white text-amber-600 shadow-sm">REVENUE</button>
                 <button className="px-5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700">OCCUPANCY</button>
               </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="masterRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#f59e0b" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#masterRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Section: Ops & Room Control */}
        <div className="xl:col-span-4 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900">Operations Hub</h2>
            <button className="text-amber-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
              Staff Hub <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-10">
            {/* Live Room Simulator Integrated */}
            <SmartRoom />

            {/* Sentiment Live Feed Preview */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                   <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                      <Activity size={18} />
                   </div>
                   Live Sentiment
                </h3>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Positive</span>
              </div>
              <div className="space-y-8 flex-1">
                {SENTIMENT_DATA.slice(0, 4).map((update, idx) => (
                  <div key={update.id} className="flex gap-4">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      update.sentiment === 'positive' ? 'bg-emerald-500' : 
                      update.sentiment === 'negative' ? 'bg-rose-500' : 'bg-slate-300'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room {update.room} • {update.time}</p>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed italic">"{update.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                Full Feedback Report
              </button>
            </div>

            {/* AI Action Card */}
            <div className="bg-indigo-900 rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-2xl">
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                       <Zap size={20} className="text-amber-400" fill="currentColor" />
                    </div>
                    <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">AI Action Required</p>
                 </div>
                 <h4 className="text-xl font-black mb-4">Inventory Alert: Teff Flour</h4>
                 <p className="text-sm text-indigo-100/70 mb-8 leading-relaxed">
                   AI predicts stock depletion by tomorrow morning due to increased breakfast bookings.
                 </p>
                 <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs hover:bg-amber-400 hover:text-white transition-all transform active:scale-95 shadow-xl">
                   AUTHORIZE AUTO-RESTOCK
                 </button>
               </div>
               <Sparkles className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};