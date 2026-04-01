import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Menu,
  X,
  Bell,
  Search,
  Zap,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Settings,
  Compass,
  Briefcase,
  MonitorCheck
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { AIConcierge } from './components/AIConcierge';
import { SmartRoom } from './components/SmartRoom';
import { PersonalizedFeed } from './components/PersonalizedFeed';
import { AdminDashboard } from './components/AdminDashboard';
import { MasterView } from './components/MasterView';
import { UserMode, NAV_ITEMS } from './lib/data';
import { useIsMobile } from './hooks/use-mobile';

export default function App() {
  const [mode, setMode] = useState<UserMode | 'master'>('master');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  // Close sidebar on mobile when switching modes
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [mode, isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (mode) {
      case 'master':
        return <MasterView />;
      case 'guest':
        return (
          <div className="space-y-12">
            {/* Guest Specific Hero and Layout */}
            <section className="relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/kuriftu-resort-aerial-view-6f4b2155-1774531417194.webp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Kuriftu Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                >
                  <Sparkles size={14} />
                  AI PREDICTED: YOU'LL LOVE THE SUNSET BOAT TOUR
                </motion.div>
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
                  Welcome Home, <br className="hidden md:block" /><span className="text-amber-400">Abeba.</span>
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <p className="text-slate-200 text-base md:text-lg max-w-lg leading-relaxed">
                    Your personalized sanctuary is ready. We've adjusted the room temperature to 21°C and your favorite jazz playlist is on standby.
                  </p>
                  <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-amber-400 hover:text-white transition-all transform hover:scale-105 shadow-xl md:ml-auto w-full md:w-auto">
                    Explore My Room
                  </button>
                </div>
              </div>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-8 space-y-12">
                <PersonalizedFeed />
              </div>
              <div className="lg:col-span-4 space-y-8">
                <SmartRoom />
              </div>
            </div>
          </div>
        );
      case 'staff':
        return <AdminDashboard />;
      default:
        return <MasterView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <Toaster position="top-right" richColors />
      
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={16} fill="currentColor" />
          </div>
          <span className="font-black text-lg tracking-tight">KURIFTU</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:text-amber-600"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar / Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside 
            initial={isMobile ? { x: -300 } : undefined}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -300 } : undefined}
            className={`fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-[60] transition-all duration-300 ${
              isSidebarOpen ? 'w-64' : 'w-20'
            } ${isMobile ? 'flex shadow-2xl' : 'hidden md:flex'} flex-col`}
          >
            <div className="p-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-600/20">
                <Zap className="text-white" size={18} fill="currentColor" />
              </div>
              {isSidebarOpen && <span className="font-black text-xl tracking-tight uppercase">Kuriftu AI</span>}
            </div>

            <nav className="flex-1 px-3 py-8 space-y-2">
              <button
                onClick={() => {
                  setMode('master');
                  setActiveTab('overview');
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all ${
                  mode === 'master' 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <MonitorCheck size={24} />
                {isSidebarOpen && <span className="font-semibold">All-in-One View</span>}
              </button>

              <button
                onClick={() => {
                  setMode('guest');
                  setActiveTab('dashboard');
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all ${
                  mode === 'guest' 
                    ? 'bg-amber-50 text-amber-600' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <LayoutDashboard size={24} />
                {isSidebarOpen && <span className="font-semibold">Guest Portal</span>}
              </button>

              <button
                onClick={() => {
                  setMode('staff');
                  setActiveTab('admin');
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all ${
                  mode === 'staff' 
                    ? 'bg-slate-900 text-white shadow-xl' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <Briefcase size={24} />
                {isSidebarOpen && <span className="font-semibold">Staff Hub</span>}
              </button>

              <div className="pt-4 pb-2">
                <div className={`h-px bg-slate-100 mx-4 ${isSidebarOpen ? 'mb-4' : 'mb-2'}`} />
              </div>

              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  <item.icon size={24} />
                  {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:flex w-full items-center justify-center p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-600 transition-colors"
              >
                <ChevronRight size={24} className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
              </button>
              <button 
                className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                onClick={() => toast.info('Signing out...')}
              >
                <LogOut size={24} />
                {isSidebarOpen && <span className="font-semibold">Sign Out</span>}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${!isMobile ? (isSidebarOpen ? 'md:ml-64' : 'md:ml-20') : 'ml-0'} min-h-screen`}>
        {/* Top Navbar */}
        <header className="hidden md:flex sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-8 py-4 items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search activities, services..." 
                 className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm w-80 focus:ring-2 focus:ring-amber-500/20"
               />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-amber-600">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Abeba G.</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Diamond Member</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-200">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Mobile Profile Area */}
          <div className="md:hidden flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200">
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80" alt="Profile" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Hi, Abeba</h3>
                  <p className="text-xs text-slate-500">Bishoftu, Ethiopia</p>
                </div>
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* AI Concierge stays floating globally */}
      <AIConcierge />
      
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}