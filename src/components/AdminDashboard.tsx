import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { REVENUE_DATA, SENTIMENT_DATA } from '../lib/data';
import { TrendingUp, Users, ShoppingBag, MessageSquare, AlertTriangle, CheckCircle2, MoreVertical, Sparkles, Calendar, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [activeChart, setActiveChart] = useState<'revenue' | 'occupancy'>('revenue');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Dashboard data synchronized');
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-amber-600/20 shrink-0">
            <Sparkles size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Operations Brain</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Real-time insights</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-amber-50 text-amber-700 px-5 py-3 rounded-2xl border border-amber-100 flex items-center gap-3 shadow-sm">
            <AlertTriangle size={18} />
            <span className="font-bold text-sm">Critical: Teff Flour Low</span>
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={20} />
          </button>
          <div className="bg-indigo-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-900/20">
            <Calendar size={18} />
            <span className="font-bold text-sm">August 2024</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Daily Revenue', value: '$11,200', change: '+18.2%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Occupancy Rate', value: '94.2%', change: '+5.4%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Service Efficiency', value: '82%', change: '-2.1%', icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Guest Happiness', value: '98%', change: '+12%', icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`bg-white p-7 rounded-[2.5rem] border ${stat.border} shadow-sm transition-all hover:shadow-xl`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance Intelligence</h3>
              <p className="text-slate-400 text-sm font-medium">Weekly revenue and occupancy tracking</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 w-full sm:w-auto">
              <button 
                onClick={() => setActiveChart('revenue')}
                className={`flex-1 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeChart === 'revenue' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
              >
                REVENUE
              </button>
              <button 
                onClick={() => setActiveChart('occupancy')}
                className={`flex-1 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeChart === 'occupancy' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
              >
                OCCUPANCY
              </button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey={activeChart} 
                  stroke="#f59e0b" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Live Feed</h3>
            <button className="text-amber-600 p-2 hover:bg-amber-50 rounded-xl transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="space-y-8 flex-1">
            {SENTIMENT_DATA.map((update, idx) => (
              <motion.div 
                key={update.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-5"
              >
                <div className={`mt-1 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  update.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-600' : 
                  update.sentiment === 'negative' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {update.sentiment === 'positive' ? <CheckCircle2 size={20} /> : <MessageSquare size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-black text-slate-900">Room {update.room}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{update.guest}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-lg">{update.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">"{update.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg">
            Generate Full Sentiment Report
          </button>
        </div>
      </div>

      {/* AI Staff Optimizer - Horizontal Card */}
      <div className="bg-indigo-900 text-white p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl group">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full text-xs font-black backdrop-blur-md mb-8 border border-white/20">
              <Sparkles size={16} />
              AI OPERATIONAL INTELLIGENCE
            </div>
            <h2 className="text-4xl font-black mb-6 leading-tight">Weekend Surge <br /><span className="text-amber-400">Detection.</span></h2>
            <p className="text-indigo-100/80 text-lg leading-relaxed mb-10 max-w-lg">
              Based on historical cultural events in Bishoftu, we predict a <span className="font-black text-white">42% increase</span> in dinner bookings this Saturday.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => toast.success('Staffing plan applied for Saturday')}
                className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black hover:bg-amber-400 hover:text-white transition-all transform hover:scale-105 shadow-xl"
              >
                Apply Recommended Schedule
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
                Analyze Data Source
              </button>
            </div>
          </div>
          
          <div className="bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-inner">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black opacity-60 uppercase tracking-widest block mb-1">Staff Optimization</span>
                <span className="text-2xl font-black">Optimal Path</span>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-black border border-emerald-500/20 uppercase tracking-widest">
                Verified
              </div>
            </div>
            <div className="space-y-6">
              {[ 
                { label: 'Restaurant Floor', current: 65, optimal: 90, color: 'bg-amber-400' },
                { label: 'Kitchen Prep', current: 40, optimal: 85, color: 'bg-indigo-400' },
                { label: 'Guest Services', current: 80, optimal: 75, color: 'bg-emerald-400' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold opacity-80 uppercase tracking-wider">{item.label}</span>
                    <span className="text-xs font-black">{item.current}% \u2192 {item.optimal}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.optimal}%` }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full -mr-48 -mt-48 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full -ml-40 -mb-40 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};