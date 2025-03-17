
import React, { useState } from 'react';
import { Shield, User, PlusCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { squadPlayers } from '@/data/sampleData';

type PlayerCard = {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  form: string;
  points: number;
  selected: boolean;
};

const SquadBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [budget, setBudget] = useState(100.0);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerCard[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerCard[]>(squadPlayers);

  const togglePlayerSelection = (player: PlayerCard) => {
    if (player.selected) {
      // Remove from selection
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setAvailablePlayers(availablePlayers.map(p => 
        p.id === player.id ? { ...p, selected: false } : p
      ));
      setBudget(prevBudget => prevBudget + player.price);
    } else {
      // Check if within budget
      if (budget < player.price) {
        console.log('Not enough budget');
        return;
      }
      
      // Add to selection
      setSelectedPlayers([...selectedPlayers, { ...player, selected: true }]);
      setAvailablePlayers(availablePlayers.map(p => 
        p.id === player.id ? { ...p, selected: true } : p
      ));
      setBudget(prevBudget => prevBudget - player.price);
    }
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="w-full md:w-2/3 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gradient">Squad Builder</h2>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"
                    >
                      AI Recommendation
                    </Button>
                    <span className="px-4 py-2 rounded-md bg-sportiq-green/20 text-sportiq-green">
                      Budget: £{budget.toFixed(1)}m
                    </span>
                  </div>
                </div>

                {/* Selected Squad */}
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Your Squad ({selectedPlayers.length}/11)</h3>
                  {selectedPlayers.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {selectedPlayers.map((player) => (
                        <div 
                          key={player.id} 
                          className="relative bg-sportiq-lightgray/20 rounded-lg p-3 cursor-pointer hover:bg-sportiq-lightgray/30 transition-colors"
                          onClick={() => togglePlayerSelection(player)}
                        >
                          <div className="mb-2 flex justify-center">
                            <div className="h-12 w-12 rounded-full bg-sportiq-purple/20 flex items-center justify-center">
                              <User className="h-6 w-6 text-sportiq-purple" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="font-medium truncate">{player.name}</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-white/70">
                              <Shield className="h-3 w-3" />
                              <span>{player.team}</span>
                            </div>
                            <p className="text-sportiq-green mt-1">£{player.price}m</p>
                          </div>
                        </div>
                      ))}
                      {Array.from({ length: Math.max(0, 11 - selectedPlayers.length) }).map((_, index) => (
                        <div key={`empty-${index}`} className="relative bg-sportiq-lightgray/10 rounded-lg p-3 border border-dashed border-sportiq-lightgray/30 flex flex-col items-center justify-center h-28">
                          <PlusCircle className="h-8 w-8 text-sportiq-lightgray/50 mb-2" />
                          <p className="text-xs text-sportiq-lightgray/50">Add Player</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-sportiq-lightgray/10 rounded-lg p-6 text-center">
                      <AlertTriangle className="h-10 w-10 text-sportiq-gold mx-auto mb-3" />
                      <p className="text-white/70">Select players from below to build your squad</p>
                    </div>
                  )}
                </GlassCard>

                {/* Available Players */}
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Available Players</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availablePlayers.map((player) => (
                      <div 
                        key={player.id} 
                        className={cn(
                          "relative bg-sportiq-lightgray/20 rounded-lg p-3 cursor-pointer transition-colors",
                          player.selected 
                            ? "border border-sportiq-green" 
                            : "hover:bg-sportiq-lightgray/30"
                        )}
                        onClick={() => togglePlayerSelection(player)}
                      >
                        <div className="flex gap-3">
                          <div className="h-12 w-12 rounded-full bg-sportiq-blue/20 flex items-center justify-center">
                            <User className="h-6 w-6 text-sportiq-blue" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sportiq-green">£{player.price}m</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-white/70">
                              <Shield className="h-3 w-3" />
                              <span>{player.team}</span>
                              <span className="mx-1">•</span>
                              <span>{player.position}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-white/70">Form: {player.form}</span>
                              <span className="text-xs text-sportiq-purple">{player.points} pts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Squad Insights */}
              <div className="w-full md:w-1/3 space-y-4">
                <h2 className="text-xl font-bold">Squad Insights</h2>
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Team Balance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Attack</span>
                        <span>Good</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-green rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Midfield</span>
                        <span>Excellent</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-blue rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Defense</span>
                        <span>Average</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-gold rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
                  <div className="space-y-3">
                    <div className="bg-sportiq-blue/10 p-3 rounded-lg border border-sportiq-blue/30">
                      <p className="text-sm">Consider adding more forwards to strengthen your attack potential.</p>
                    </div>
                    <div className="bg-sportiq-gold/10 p-3 rounded-lg border border-sportiq-gold/30">
                      <p className="text-sm">Your selection has 3 players from upcoming difficult fixtures.</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SquadBuilder;
