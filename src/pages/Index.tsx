
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Activity, ChevronRight } from 'lucide-react';
import { Line } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { recentMatches, performanceStats, teamPerformance } from '@/data/sampleData';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
              <GlassCard hoverable className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-sportiq-blue/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-sportiq-blue" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Prediction Accuracy</p>
                  <p className="text-2xl font-semibold">92%</p>
                </div>
              </GlassCard>

              <GlassCard hoverable className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-sportiq-green/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-sportiq-green" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Success Rate</p>
                  <p className="text-2xl font-semibold">85%</p>
                </div>
              </GlassCard>

              <GlassCard hoverable className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-sportiq-purple/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-sportiq-purple" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Teams Analyzed</p>
                  <p className="text-2xl font-semibold">40</p>
                </div>
              </GlassCard>

              <GlassCard hoverable className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-sportiq-red/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-sportiq-red" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Live Matches</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </GlassCard>
            </div>

            {/* Recent Matches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Recent Matches</h2>
                  <button className="text-sm text-sportiq-blue hover:text-sportiq-blue/80 flex items-center gap-1">
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <GlassCard key={match.id} variant="dark" hoverable>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-white/50">{match.tournament}</span>
                          <div className="mt-1">
                            <p className="font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                            <p className="text-sm text-white/70">
                              {match.homeScore} - {match.awayScore}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            match.prediction.accuracy >= 0.7 
                              ? "bg-sportiq-green/20 text-sportiq-green"
                              : "bg-sportiq-gold/20 text-sportiq-gold"
                          )}>
                            {(match.prediction.accuracy * 100).toFixed(0)}% Accurate
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>

              {/* Performance Trends */}
              <GlassCard className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Performance Trends</h2>
                  <button className="text-sm text-sportiq-blue hover:text-sportiq-blue/80 flex items-center gap-1">
                    More Details
                    <ChevronRight size={16} />
                  </button>
                </div>
                {/* Add a simple line chart here */}
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
