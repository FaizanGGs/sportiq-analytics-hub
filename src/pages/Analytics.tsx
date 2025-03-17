
import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <GlassCard className="p-4 flex flex-col items-center justify-center">
                <BarChart3 className="h-16 w-16 text-sportiq-blue mb-4" />
                <h2 className="text-lg font-semibold">Team Statistics</h2>
                <p className="text-white/70 mt-2 text-center">Advanced team performance metrics and comparisons</p>
                <Button className="mt-4 bg-sportiq-blue hover:bg-sportiq-blue/90">View Report</Button>
              </GlassCard>
              
              <GlassCard className="p-4 flex flex-col items-center justify-center">
                <PieChart className="h-16 w-16 text-sportiq-purple mb-4" />
                <h2 className="text-lg font-semibold">Player Analysis</h2>
                <p className="text-white/70 mt-2 text-center">In-depth player performance and contribution statistics</p>
                <Button className="mt-4 bg-sportiq-purple hover:bg-sportiq-purple/90">View Players</Button>
              </GlassCard>
              
              <GlassCard className="p-4 flex flex-col items-center justify-center">
                <LineChart className="h-16 w-16 text-sportiq-green mb-4" />
                <h2 className="text-lg font-semibold">Trend Analysis</h2>
                <p className="text-white/70 mt-2 text-center">Long-term performance trends and pattern recognition</p>
                <Button className="mt-4 bg-sportiq-green hover:bg-sportiq-green/90">View Trends</Button>
              </GlassCard>
            </div>
            
            <GlassCard className="p-4">
              <h2 className="text-xl font-semibold mb-4">Analytics Dashboard Coming Soon</h2>
              <p className="text-white/70">Our advanced analytics dashboard is currently under development. Check back soon for detailed sports analytics featuring:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-white/70">
                <li>Team performance metrics with historical comparisons</li>
                <li>Player contribution analysis across multiple metrics</li>
                <li>Head-to-head matchup predictions and insights</li>
                <li>Form trend analysis with machine learning projections</li>
                <li>Custom reports and data visualization tools</li>
              </ul>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
