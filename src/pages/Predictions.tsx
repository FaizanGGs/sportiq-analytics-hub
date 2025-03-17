
import React, { useState } from 'react';
import { Zap, TrendingUp, Award } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { upcomingMatches } from '@/data/sampleData';

const Predictions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">AI Predictions</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard className="p-4 flex gap-3 items-center">
                <div className="h-12 w-12 rounded-lg bg-sportiq-blue/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-sportiq-blue" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Prediction Accuracy</p>
                  <p className="text-2xl font-semibold">92%</p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-4 flex gap-3 items-center">
                <div className="h-12 w-12 rounded-lg bg-sportiq-purple/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-sportiq-purple" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Matches Predicted</p>
                  <p className="text-2xl font-semibold">156</p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-4 flex gap-3 items-center">
                <div className="h-12 w-12 rounded-lg bg-sportiq-green/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-sportiq-green" />
                </div>
                <div>
                  <p className="text-sm text-white/70">AI Model Confidence</p>
                  <p className="text-2xl font-semibold">High</p>
                </div>
              </GlassCard>
            </div>
            
            <GlassCard className="p-4">
              <h2 className="text-xl font-semibold mb-4">Upcoming Match Predictions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingMatches.map((match) => (
                  <GlassCard key={match.id} variant="dark" className="p-4">
                    <div className="mb-2 text-xs text-white/50">{match.league} • {match.date}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold">{match.homeTeam}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`h-2 w-2 rounded-full ${match.homeForm === 'Good' ? 'bg-sportiq-green' : match.homeForm === 'Average' ? 'bg-sportiq-gold' : 'bg-sportiq-red'}`}></div>
                          <p className="text-xs text-white/70">Form: {match.homeForm}</p>
                        </div>
                      </div>
                      
                      <div className="text-center px-4">
                        <p className="font-bold text-lg">vs</p>
                        <div className="flex gap-1 mt-2">
                          <div className={`px-2 py-1 text-xs rounded-full ${match.prediction.winner === match.homeTeam ? 'bg-sportiq-green/20 text-sportiq-green' : 'bg-sportiq-lightgray/20 text-white/70'}`}>
                            {match.prediction.homeWinProb}%
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${match.prediction.winner === 'Draw' ? 'bg-sportiq-gold/20 text-sportiq-gold' : 'bg-sportiq-lightgray/20 text-white/70'}`}>
                            {match.prediction.drawProb}%
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${match.prediction.winner === match.awayTeam ? 'bg-sportiq-green/20 text-sportiq-green' : 'bg-sportiq-lightgray/20 text-white/70'}`}>
                            {match.prediction.awayWinProb}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-right">
                        <p className="font-semibold">{match.awayTeam}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <p className="text-xs text-white/70">Form: {match.awayForm}</p>
                          <div className={`h-2 w-2 rounded-full ${match.awayForm === 'Good' ? 'bg-sportiq-green' : match.awayForm === 'Average' ? 'bg-sportiq-gold' : 'bg-sportiq-red'}`}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-sportiq-lightgray/30">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Prediction: <span className="text-sportiq-blue">{match.prediction.winner}</span></p>
                        <p className="text-xs px-2 py-1 rounded-full bg-sportiq-blue/20 text-sportiq-blue">
                          {match.prediction.confidence}% Confidence
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Predictions;
