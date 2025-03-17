
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const Schedules = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">Schedules</h1>
            
            <GlassCard className="p-8 flex flex-col items-center justify-center text-center">
              <Calendar className="h-16 w-16 text-sportiq-blue mb-4" />
              <h2 className="text-xl font-semibold">Match Schedules Coming Soon</h2>
              <p className="text-white/70 mt-3 max-w-2xl">
                Our comprehensive match scheduling system is currently under development. 
                Soon you'll be able to view upcoming fixtures across all leagues with AI-powered predictions.
              </p>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Schedules;
