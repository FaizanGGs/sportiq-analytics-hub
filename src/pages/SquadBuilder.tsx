
import React, { useState } from 'react';
import { Shield, User, PlusCircle, AlertTriangle, DollarSign, BarChart2, RefreshCcw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { squadPlayers, footballFormations, cricketFormations } from '@/data/sampleData';

type PlayerCard = {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  form: string;
  points: number;
  selected: boolean;
  sport: 'football' | 'cricket';
  stats?: {
    [key: string]: number | string;
  };
};

type Formation = {
  name: string;
  positions: {
    id: string;
    name: string;
    x: number;
    y: number;
  }[];
};

const SquadBuilder = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [budget, setBudget] = useState(100.0);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerCard[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerCard[]>(squadPlayers);
  const [activeSport, setActiveSport] = useState<'football' | 'cricket'>('football');
  const [currentFormation, setCurrentFormation] = useState<Formation>(
    activeSport === 'football' ? footballFormations[0] : cricketFormations[0]
  );
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [playersToCompare, setPlayersToCompare] = useState<PlayerCard[]>([]);
  const [customBudget, setCustomBudget] = useState(budget.toString());

  // Toggle player selection
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

  // Toggle compare mode and manage players to compare
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setPlayersToCompare([]);
  };

  const togglePlayerComparison = (player: PlayerCard) => {
    if (playersToCompare.some(p => p.id === player.id)) {
      setPlayersToCompare(playersToCompare.filter(p => p.id !== player.id));
    } else {
      if (playersToCompare.length < 3) {
        setPlayersToCompare([...playersToCompare, player]);
      }
    }
  };

  // Change sport and reset states
  const changeSport = (sport: 'football' | 'cricket') => {
    setActiveSport(sport);
    setSelectedPlayers([]);
    setBudget(100.0);
    setCurrentFormation(sport === 'football' ? footballFormations[0] : cricketFormations[0]);
    setAvailablePlayers(squadPlayers.map(p => ({ ...p, selected: false })));
  };

  // Update budget
  const updateBudget = () => {
    const newBudget = parseFloat(customBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
    }
  };

  // Filter available players
  const filteredPlayers = availablePlayers.filter(player => 
    player.sport === activeSport && 
    (player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
     player.position.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get player for position
  const getPlayerForPosition = (positionId: string) => {
    return selectedPlayers.find(player => 
      player.position.toLowerCase() === positionId.toLowerCase()
    );
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            {showWelcome && (
              <GlassCard className="p-6 relative">
                <button 
                  onClick={() => setShowWelcome(false)} 
                  className="absolute top-3 right-3 text-white/50 hover:text-white"
                >
                  ✕
                </button>
                <h1 className="text-3xl font-bold text-gradient mb-2">Welcome to SportIQ Squad Builder</h1>
                <p className="text-xl text-white/80 mb-4">
                  Build the perfect fantasy team powered by data-driven insights and analytics
                </p>
                <p className="text-white/60">
                  Create winning squads for both cricket and football with our advanced analytics tools. 
                  Select your sport, customize your budget, and build a championship team.
                </p>
              </GlassCard>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="w-full md:w-2/3 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h2 className="text-2xl font-bold text-gradient">Squad Builder</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex rounded-md overflow-hidden">
                      <Button 
                        variant={activeSport === 'football' ? "default" : "outline"} 
                        className={activeSport === 'football' ? "bg-sportiq-blue hover:bg-sportiq-blue/90" : "bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"}
                        onClick={() => changeSport('football')}
                      >
                        Football
                      </Button>
                      <Button 
                        variant={activeSport === 'cricket' ? "default" : "outline"} 
                        className={activeSport === 'cricket' ? "bg-sportiq-purple hover:bg-sportiq-purple/90" : "bg-sportiq-purple/10 text-sportiq-purple hover:bg-sportiq-purple/20"}
                        onClick={() => changeSport('cricket')}
                      >
                        Cricket
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className={cn(
                        "transition-colors",
                        compareMode 
                          ? "bg-sportiq-gold text-black hover:bg-sportiq-gold/90" 
                          : "bg-sportiq-gold/10 text-sportiq-gold hover:bg-sportiq-gold/20"
                      )}
                      onClick={toggleCompareMode}
                    >
                      {compareMode ? "Exit Compare" : "Compare Players"}
                    </Button>
                  </div>
                </div>

                {/* Budget Customization */}
                <GlassCard className="p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-sportiq-green" />
                      <h3 className="text-lg font-semibold">Budget: £{budget.toFixed(1)}m</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Custom budget"
                        className="w-32 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="bg-sportiq-green/10 text-sportiq-green hover:bg-sportiq-green/20"
                        onClick={updateBudget}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </GlassCard>
                
                {/* Formation Display */}
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Formation: {currentFormation.name}</h3>
                  
                  <div className="relative bg-[#0d2b0d] rounded-lg p-4 h-80 mb-3 overflow-hidden">
                    {/* Field markings */}
                    <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                    {activeSport === 'football' && (
                      <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-b-2 border-x-2 border-white/20"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-t-2 border-x-2 border-white/20"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-white/20"></div>
                      </>
                    )}
                    {activeSport === 'cricket' && (
                      <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/4 border-2 border-white/20"></div>
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/8 h-1/2 border-2 border-white/20"></div>
                      </>
                    )}
                    
                    {/* Position circles */}
                    {currentFormation.positions.map((position) => {
                      const player = getPlayerForPosition(position.id);
                      return (
                        <div 
                          key={position.id}
                          className={cn(
                            "absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex items-center justify-center transition-all",
                            player ? "bg-sportiq-green/80" : "bg-white/20 border-2 border-dashed border-white/40"
                          )}
                          style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        >
                          {player ? (
                            <div className="text-center">
                              <div className="text-xs font-bold truncate max-w-12">{player.name.split(' ')[0]}</div>
                              <div className="text-[10px] opacity-80">{position.name}</div>
                            </div>
                          ) : (
                            <div className="text-center text-xs opacity-70">{position.name}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {(activeSport === 'football' ? footballFormations : cricketFormations).map((formation) => (
                      <Button
                        key={formation.name}
                        variant="outline"
                        className={cn(
                          "text-xs bg-sportiq-lightgray/10",
                          currentFormation.name === formation.name 
                            ? "border-sportiq-green text-sportiq-green" 
                            : "border-sportiq-lightgray/30"
                        )}
                        onClick={() => setCurrentFormation(formation)}
                      >
                        {formation.name}
                      </Button>
                    ))}
                  </div>
                </GlassCard>

                {/* Selected Squad */}
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Your Squad ({selectedPlayers.length}/{activeSport === 'football' ? 11 : 11})</h3>
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
                            <p className="text-xs text-white/70 mt-1">{player.position}</p>
                          </div>
                        </div>
                      ))}
                      {Array.from({ length: Math.max(0, (activeSport === 'football' ? 11 : 11) - selectedPlayers.length) }).map((_, index) => (
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

                {/* Player Comparison Section (Conditional) */}
                {compareMode && (
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Player Comparison</h3>
                      <p className="text-sm text-white/70">Select up to 3 players below to compare</p>
                    </div>
                    
                    {playersToCompare.length > 0 ? (
                      <div className="space-y-4">
                        {/* Comparison Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {playersToCompare.map(player => (
                            <div key={player.id} className="bg-sportiq-lightgray/20 rounded-lg p-3">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-full bg-sportiq-purple/20 flex items-center justify-center">
                                  <User className="h-6 w-6 text-sportiq-purple" />
                                </div>
                                <div>
                                  <p className="font-medium">{player.name}</p>
                                  <p className="text-sm text-white/70">{player.team} • {player.position}</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="ml-auto text-white/60 hover:text-white/90 hover:bg-sportiq-lightgray/30"
                                  onClick={() => togglePlayerComparison(player)}
                                >
                                  ✕
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Comparison Stats */}
                        <div className="overflow-x-auto pb-2">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left pb-2 pl-2 font-medium">Stat</th>
                                {playersToCompare.map(player => (
                                  <th key={player.id} className="text-center pb-2 font-medium">{player.name.split(' ')[0]}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-white/10">
                                <td className="py-2 pl-2">Price</td>
                                {playersToCompare.map(player => (
                                  <td key={player.id} className="py-2 text-center">£{player.price}m</td>
                                ))}
                              </tr>
                              <tr className="border-b border-white/10">
                                <td className="py-2 pl-2">Points</td>
                                {playersToCompare.map(player => (
                                  <td key={player.id} className="py-2 text-center">{player.points}</td>
                                ))}
                              </tr>
                              <tr className="border-b border-white/10">
                                <td className="py-2 pl-2">Form</td>
                                {playersToCompare.map(player => (
                                  <td key={player.id} className="py-2 text-center">{player.form}</td>
                                ))}
                              </tr>
                              {activeSport === 'football' && (
                                <>
                                  <tr className="border-b border-white/10">
                                    <td className="py-2 pl-2">Goals</td>
                                    {playersToCompare.map(player => (
                                      <td key={player.id} className="py-2 text-center">{player.stats?.goals || 0}</td>
                                    ))}
                                  </tr>
                                  <tr className="border-b border-white/10">
                                    <td className="py-2 pl-2">Assists</td>
                                    {playersToCompare.map(player => (
                                      <td key={player.id} className="py-2 text-center">{player.stats?.assists || 0}</td>
                                    ))}
                                  </tr>
                                </>
                              )}
                              {activeSport === 'cricket' && (
                                <>
                                  <tr className="border-b border-white/10">
                                    <td className="py-2 pl-2">Runs</td>
                                    {playersToCompare.map(player => (
                                      <td key={player.id} className="py-2 text-center">{player.stats?.runs || 0}</td>
                                    ))}
                                  </tr>
                                  <tr className="border-b border-white/10">
                                    <td className="py-2 pl-2">Wickets</td>
                                    {playersToCompare.map(player => (
                                      <td key={player.id} className="py-2 text-center">{player.stats?.wickets || 0}</td>
                                    ))}
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-sportiq-lightgray/10 rounded-lg p-6 text-center">
                        <p className="text-white/70">Select players below to compare their statistics</p>
                      </div>
                    )}
                  </GlassCard>
                )}

                {/* Available Players */}
                <GlassCard className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold">Available Players</h3>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                      <Input 
                        className="pl-9 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        placeholder="Search players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredPlayers.map((player) => (
                      <div 
                        key={player.id} 
                        className={cn(
                          "relative bg-sportiq-lightgray/20 rounded-lg p-3 cursor-pointer transition-colors",
                          compareMode ? "hover:bg-sportiq-gold/10" : "hover:bg-sportiq-lightgray/30",
                          player.selected 
                            ? "border border-sportiq-green" 
                            : compareMode && playersToCompare.some(p => p.id === player.id)
                              ? "border border-sportiq-gold"
                              : ""
                        )}
                        onClick={() => compareMode ? togglePlayerComparison(player) : togglePlayerSelection(player)}
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
                        <span className="text-white/70">{activeSport === 'football' ? 'Attack' : 'Batting'}</span>
                        <span>Good</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-green rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activeSport === 'football' ? 'Midfield' : 'All-rounders'}</span>
                        <span>Excellent</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-blue rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activeSport === 'football' ? 'Defense' : 'Bowling'}</span>
                        <span>Average</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-gold rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Performance Metrics</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Points Visualization */}
                    <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Total Points</h4>
                        <span className="text-lg font-bold text-sportiq-green">
                          {selectedPlayers.reduce((sum, player) => sum + player.points, 0)}
                        </span>
                      </div>
                      <div className="flex items-end h-10 gap-1">
                        {selectedPlayers.map((player, index) => (
                          <div 
                            key={player.id}
                            className="bg-sportiq-blue h-full rounded-sm transition-all"
                            style={{ 
                              width: `${100 / Math.max(1, selectedPlayers.length)}%`,
                              height: `${(player.points / 100) * 100}%`,
                              backgroundColor: `hsl(${210 + index * 30}, 70%, 60%)`
                            }}
                            title={`${player.name}: ${player.points} pts`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Team Distribution */}
                    <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Team Distribution</h4>
                      {selectedPlayers.length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(
                            selectedPlayers.reduce((acc, player) => {
                              acc[player.team] = (acc[player.team] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([team, count]) => (
                            <div key={team}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{team}</span>
                                <span>{count} players</span>
                              </div>
                              <div className="h-1.5 bg-sportiq-lightgray/20 rounded-full">
                                <div 
                                  className="h-full bg-sportiq-purple rounded-full" 
                                  style={{ width: `${(count / selectedPlayers.length) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-white/60 text-center py-2">Add players to see team distribution</p>
                      )}
                    </div>
                    
                    {/* Position Balance */}
                    <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Position Balance</h4>
                      {selectedPlayers.length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(
                            selectedPlayers.reduce((acc, player) => {
                              acc[player.position] = (acc[player.position] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([position, count]) => (
                            <div key={position}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{position}</span>
                                <span>{count}</span>
                              </div>
                              <div className="h-1.5 bg-sportiq-lightgray/20 rounded-full">
                                <div 
                                  className="h-full rounded-full" 
                                  style={{ 
                                    width: `${(count / selectedPlayers.length) * 100}%`,
                                    backgroundColor: position.includes('Forward') || position.includes('Batsman') 
                                      ? '#10b981' // green
                                      : position.includes('Midfielder') || position.includes('All-rounder')
                                        ? '#3b82f6' // blue
                                        : '#f59e0b' // gold
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-white/60 text-center py-2">Add players to see position balance</p>
                      )}
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
                  <div className="space-y-3">
                    <div className="bg-sportiq-blue/10 p-3 rounded-lg border border-sportiq-blue/30">
                      <p className="text-sm">Consider adding more {activeSport === 'football' ? 'forwards to strengthen your attack potential' : 'bowlers to balance your squad'}.</p>
                    </div>
                    <div className="bg-sportiq-gold/10 p-3 rounded-lg border border-sportiq-gold/30">
                      <p className="text-sm">Your selection has {Math.floor(Math.random() * 5) + 1} players from upcoming difficult fixtures.</p>
                    </div>
                    {activeSport === 'football' && (
                      <div className="bg-sportiq-purple/10 p-3 rounded-lg border border-sportiq-purple/30">
                        <p className="text-sm">Based on recent performances, consider adding De Bruyne for higher point potential.</p>
                      </div>
                    )}
                    {activeSport === 'cricket' && (
                      <div className="bg-sportiq-purple/10 p-3 rounded-lg border border-sportiq-purple/30">
                        <p className="text-sm">Babar Azam has been in exceptional form, making him a strong captain choice.</p>
                      </div>
                    )}
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
