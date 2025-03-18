
import React, { useState, useEffect } from 'react';
import { Shield, User, PlusCircle, AlertTriangle, DollarSign, BarChart2, RefreshCcw, Search, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { squadPlayers, footballFormations, cricketFormations } from '@/data/sampleData';
import { toast } from '@/components/ui/use-toast';

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

type Position = {
  id: string;
  name: string;
  x: number;
  y: number;
};

type Formation = {
  name: string;
  positions: Position[];
};

type PositionAssignment = {
  positionId: string;
  positionName: string;
  playerId: number | null;
};

const SquadBuilder = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [budget, setBudget] = useState(100.0);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerCard[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerCard[]>(
    squadPlayers.map(player => ({
      ...player,
      sport: player.sport as 'football' | 'cricket'
    })) as PlayerCard[]
  );
  const [activeSport, setActiveSport] = useState<'football' | 'cricket'>('football');
  const [currentFormation, setCurrentFormation] = useState<Formation>(
    activeSport === 'football' ? footballFormations[0] : cricketFormations[0]
  );
  const [positionAssignments, setPositionAssignments] = useState<PositionAssignment[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [playersToCompare, setPlayersToCompare] = useState<PlayerCard[]>([]);
  const [customBudget, setCustomBudget] = useState(budget.toString());
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  // Update current formation and position assignments when active sport changes
  useEffect(() => {
    const newFormation = activeSport === 'football' ? footballFormations[0] : cricketFormations[0];
    setCurrentFormation(newFormation);
    
    // Initialize position assignments for the new formation
    initializePositionAssignments(newFormation.positions);
  }, [activeSport]);

  // Update position assignments when changing formation
  useEffect(() => {
    initializePositionAssignments(currentFormation.positions);
  }, [currentFormation]);

  // Initialize position assignments
  const initializePositionAssignments = (positions: Position[]) => {
    const newAssignments = positions.map(position => ({
      positionId: position.id,
      positionName: position.name,
      playerId: null
    }));
    
    setPositionAssignments(newAssignments);
    setSelectedPlayers([]);
  };

  // Toggle player selection
  const togglePlayerSelection = (player: PlayerCard) => {
    // If we're in position selection mode and a position is selected
    if (selectedPosition && !player.selected) {
      // Check if within budget
      if (budget < player.price) {
        toast({
          title: "Not enough budget",
          description: `You need £${player.price}m but only have £${budget.toFixed(1)}m available.`,
          variant: "destructive"
        });
        return;
      }
      
      // Find the position assignment
      const assignment = positionAssignments.find(a => a.positionId === selectedPosition);
      if (!assignment) return;
      
      // If position already has a player, remove that player first
      if (assignment.playerId !== null) {
        const existingPlayer = selectedPlayers.find(p => p.id === assignment.playerId);
        if (existingPlayer) {
          setSelectedPlayers(selectedPlayers.filter(p => p.id !== existingPlayer.id));
          setAvailablePlayers(availablePlayers.map(p => 
            p.id === existingPlayer.id ? { ...p, selected: false } : p
          ));
          setBudget(prevBudget => prevBudget + existingPlayer.price);
        }
      }
      
      // Add player to the position
      const updatedAssignments = positionAssignments.map(a => 
        a.positionId === selectedPosition ? { ...a, playerId: player.id } : a
      );
      setPositionAssignments(updatedAssignments);
      
      // Add to selected players
      const modifiedPlayer = { 
        ...player, 
        selected: true, 
        position: assignment.positionId // Store the position ID
      };
      setSelectedPlayers([...selectedPlayers.filter(p => p.id !== player.id), modifiedPlayer]);
      
      // Mark player as selected in available players
      setAvailablePlayers(availablePlayers.map(p => 
        p.id === player.id ? { ...p, selected: true } : p
      ));
      
      // Update budget
      setBudget(prevBudget => prevBudget - player.price);
      
      // Clear the position selection
      setSelectedPosition(null);
      
      toast({
        title: "Player Added",
        description: `${player.name} has been added to ${assignment.positionName}`,
      });
      return;
    }
    
    if (player.selected) {
      // Remove from position assignments
      const updatedAssignments = positionAssignments.map(a => 
        a.playerId === player.id ? { ...a, playerId: null } : a
      );
      setPositionAssignments(updatedAssignments);
      
      // Remove from selection
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setAvailablePlayers(availablePlayers.map(p => 
        p.id === player.id ? { ...p, selected: false } : p
      ));
      setBudget(prevBudget => prevBudget + player.price);
      
      toast({
        title: "Player Removed",
        description: `${player.name} has been removed from your squad`,
      });
    }
  };

  // Select a position to add a player to
  const selectPosition = (positionId: string) => {
    setSelectedPosition(positionId);
    const position = currentFormation.positions.find(p => p.id === positionId);
    if (position) {
      toast({
        title: "Position Selected",
        description: `Select a player for the ${position.name} position`,
      });
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
    setBudget(100.0);
    setSelectedPosition(null);
    setCurrentFormation(sport === 'football' ? footballFormations[0] : cricketFormations[0]);
    setSelectedPlayers([]);
    setAvailablePlayers(
      squadPlayers.map(player => ({
        ...player,
        selected: false,
        sport: player.sport as 'football' | 'cricket'
      })) as PlayerCard[]
    );
  };

  // Update budget
  const updateBudget = () => {
    const newBudget = parseFloat(customBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
      toast({
        title: "Budget Updated",
        description: `Your budget is now £${newBudget.toFixed(1)}m`,
      });
    }
  };

  // Filter available players based on selected position
  const filteredPlayers = availablePlayers.filter(player => {
    // Only show players of the active sport
    if (player.sport !== activeSport) return false;
    
    // Apply search filter
    const matchesSearch = (
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (!matchesSearch) return false;
    
    // If a position is selected, filter players by appropriate position
    if (selectedPosition) {
      const position = currentFormation.positions.find(p => p.id === selectedPosition);
      if (position) {
        // Football position filtering
        if (activeSport === 'football') {
          // Position mapping
          if (position.id === 'Goalkeeper' && player.position === 'Goalkeeper') return true;
          if (position.id === 'Defender' && player.position === 'Defender') return true;
          if (position.id === 'Midfielder' && player.position === 'Midfielder') return true;
          if (position.id === 'Forward' && player.position === 'Forward') return true;
        }
        // Cricket position filtering
        else {
          // Cricket position mapping
          if (position.id === 'Batsman' && player.position === 'Batsman') return true;
          if (position.id === 'Bowler' && player.position === 'Bowler') return true;
          if (position.id === 'Wicketkeeper' && player.position === 'Wicketkeeper') return true;
          if (position.id === 'All-rounder' && player.position === 'All-rounder') return true;
        }
        return false;
      }
    }
    
    return true;
  });

  // Get player for position
  const getPlayerForPosition = (positionId: string): PlayerCard | undefined => {
    const assignment = positionAssignments.find(a => a.positionId === positionId);
    if (assignment && assignment.playerId !== null) {
      return selectedPlayers.find(player => player.id === assignment.playerId);
    }
    return undefined;
  };

  // Get AI recommendation for player selection based on position
  const getAIRecommendation = () => {
    if (!selectedPosition) return null;
    
    // Position-specific recommendations
    const positionType = currentFormation.positions.find(p => p.id === selectedPosition)?.id || '';
    
    // Filter players by position and availability
    const availablePlayersForPosition = availablePlayers.filter(p => 
      p.sport === activeSport && 
      !p.selected && 
      // Match the position type (like Defender, Forward, etc.)
      p.position.includes(positionType)
    );
    
    if (availablePlayersForPosition.length === 0) return null;
    
    // Sort by different criteria based on position
    let sortedPlayers: PlayerCard[] = [];
    
    if (activeSport === 'football') {
      if (positionType === 'Forward') {
        // For forwards prioritize goals
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.stats?.goals as number || 0) - (a.stats?.goals as number || 0)
        );
      } else if (positionType === 'Defender') {
        // For defenders prioritize clean sheets 
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.stats?.cleanSheets as number || 0) - (a.stats?.cleanSheets as number || 0)
        );
      } else {
        // For others, sort by general value (points/price)
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.points / b.price) - (a.points / a.price)
        );
      }
    } else { // Cricket
      if (positionType === 'Batsman') {
        // For batsmen prioritize runs
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.stats?.runs as number || 0) - (a.stats?.runs as number || 0)
        );
      } else if (positionType === 'Bowler') {
        // For bowlers prioritize wickets
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.stats?.wickets as number || 0) - (a.stats?.wickets as number || 0)
        );
      } else {
        // For others, sort by general value
        sortedPlayers = [...availablePlayersForPosition].sort((a, b) => 
          (b.points / b.price) - (a.points / a.price)
        );
      }
    }
    
    // Get top recommendations
    return sortedPlayers.slice(0, 3);
  };

  // Recommended players
  const recommendedPlayers = getAIRecommendation();

  // Calculate team balance metrics
  const calculateTeamBalance = () => {
    if (selectedPlayers.length === 0) {
      return {
        attack: 0,
        midfield: 0,
        defense: 0
      };
    }

    if (activeSport === 'football') {
      const forwardCount = selectedPlayers.filter(p => p.position === 'Forward').length;
      const midfielderCount = selectedPlayers.filter(p => p.position === 'Midfielder').length;
      const defenderCount = selectedPlayers.filter(p => p.position === 'Defender').length;
      const gkCount = selectedPlayers.filter(p => p.position === 'Goalkeeper').length;
      
      const totalPlayers = selectedPlayers.length;
      
      // Calculate ratios (scale up to percentages)
      return {
        attack: Math.min(100, forwardCount / (totalPlayers * 0.3) * 100),
        midfield: Math.min(100, midfielderCount / (totalPlayers * 0.4) * 100),
        defense: Math.min(100, (defenderCount + gkCount) / (totalPlayers * 0.4) * 100)
      };
    } else {
      // Cricket team balance
      const batsmanCount = selectedPlayers.filter(p => p.position === 'Batsman').length;
      const allrounderCount = selectedPlayers.filter(p => p.position === 'All-rounder').length;
      const bowlerCount = selectedPlayers.filter(p => p.position === 'Bowler').length;
      
      const totalPlayers = selectedPlayers.length;
      
      return {
        attack: Math.min(100, batsmanCount / (totalPlayers * 0.4) * 100),
        midfield: Math.min(100, allrounderCount / (totalPlayers * 0.2) * 100),
        defense: Math.min(100, bowlerCount / (totalPlayers * 0.4) * 100)
      };
    }
  };

  const teamBalance = calculateTeamBalance();

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
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Formation: {currentFormation.name}</h3>
                    {selectedPosition && (
                      <div className="bg-sportiq-green/20 text-sportiq-green px-3 py-1 rounded-md text-sm">
                        Select a player for position: {
                          currentFormation.positions.find(p => p.id === selectedPosition)?.name || selectedPosition
                        }
                      </div>
                    )}
                  </div>
                  
                  {activeSport === 'football' && (
                    <div className="relative bg-[#0d2b0d] rounded-lg p-4 h-80 mb-3 overflow-hidden">
                      {/* Field markings */}
                      <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-b-2 border-x-2 border-white/20"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-t-2 border-x-2 border-white/20"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-white/20"></div>
                      
                      {/* Position circles */}
                      {currentFormation.positions.map((position) => {
                        const player = getPlayerForPosition(position.id);
                        return (
                          <div 
                            key={`${currentFormation.name}-${position.id}-${position.name}`}
                            className={cn(
                              "absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
                              player ? "bg-sportiq-green/80" : "bg-white/20 border-2 border-dashed border-white/40",
                              selectedPosition === position.id ? "ring-2 ring-sportiq-gold" : ""
                            )}
                            style={{ left: `${position.x}%`, top: `${position.y}%` }}
                            onClick={() => selectPosition(position.id)}
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
                  )}
                  
                  {activeSport === 'cricket' && (
                    <div className="relative bg-[#f3edd7] rounded-lg p-4 h-80 mb-3 overflow-hidden">
                      {/* Cricket field markings */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#0d5c2f]/50"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border-2 border-[#0d5c2f]/80"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 bg-[#b3964b]/30"></div>
                      
                      {/* Cricket-specific positions arranged in a circle and center */}
                      {currentFormation.positions.map((position) => {
                        const player = getPlayerForPosition(position.id);
                        const isBowler = position.id.includes('Bowler');
                        const isBatsman = position.id.includes('Batsman');
                        const isWicketkeeper = position.id.includes('Wicketkeeper');
                        
                        return (
                          <div 
                            key={`${currentFormation.name}-${position.id}-${position.name}`}
                            className={cn(
                              "absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
                              player ? 
                                isWicketkeeper ? "bg-sportiq-gold/80" : 
                                isBowler ? "bg-sportiq-blue/80" : 
                                isBatsman ? "bg-sportiq-green/80" : "bg-sportiq-purple/80"
                                : "bg-white/60 border-2 border-dashed border-[#0d5c2f]/60",
                              selectedPosition === position.id ? "ring-2 ring-white" : ""
                            )}
                            style={{ left: `${position.x}%`, top: `${position.y}%` }}
                            onClick={() => selectPosition(position.id)}
                          >
                            {player ? (
                              <div className="text-center text-black">
                                <div className="text-xs font-bold truncate max-w-12">{player.name.split(' ')[0]}</div>
                                <div className="text-[10px] opacity-80">{position.name.split(' ')[0]}</div>
                              </div>
                            ) : (
                              <div className="text-center text-xs text-black font-medium">{position.name.split(' ')[0]}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
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
                      {selectedPlayers.map((player) => {
                        // Find player's position name
                        const assignment = positionAssignments.find(a => a.playerId === player.id);
                        const positionName = assignment ? assignment.positionName : player.position;
                        
                        return (
                          <div 
                            key={player.id} 
                            className={cn(
                              "relative bg-sportiq-lightgray/20 rounded-lg p-3 cursor-pointer hover:bg-sportiq-lightgray/30 transition-colors",
                              activeSport === 'cricket' && player.position.includes('Bowler') ? "border-l-4 border-sportiq-blue" : 
                              activeSport === 'cricket' && player.position.includes('Batsman') ? "border-l-4 border-sportiq-green" : 
                              activeSport === 'cricket' && player.position.includes('Wicketkeeper') ? "border-l-4 border-sportiq-gold" : ""
                            )}
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
                              <p className="text-xs text-white/70 mt-1">{positionName}</p>
                            </div>
                          </div>
                        );
                      })}
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
                              {activeSport === 'football' && playersToCompare.every(p => p.sport === 'football') && (
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
                              {activeSport === 'cricket' && playersToCompare.every(p => p.sport === 'cricket') && (
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
                  
                  {selectedPosition && (
                    <div className="mb-4 p-3 bg-sportiq-green/10 rounded-lg text-sm">
                      {filteredPlayers.length > 0 ? (
                        <p>Click on a player below to assign them to the <strong>{
                          currentFormation.positions.find(p => p.id === selectedPosition)?.name || selectedPosition
                        }</strong> position. <Button variant="link" className="text-sportiq-red p-0 h-auto" onClick={() => setSelectedPosition(null)}>Cancel</Button></p>
                      ) : (
                        <p>No suitable players found for <strong>{
                          currentFormation.positions.find(p => p.id === selectedPosition)?.name || selectedPosition
                        }</strong>. Try adjusting your search or <Button variant="link" className="text-sportiq-red p-0 h-auto" onClick={() => setSelectedPosition(null)}>Cancel</Button></p>
                      )}
                    </div>
                  )}
                  
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
                              : selectedPosition ? "border border-sportiq-blue" : ""
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
                
                {/* AI Recommended Players */}
                <GlassCard className="p-4">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-5 w-5 text-sportiq-gold mr-2" />
                    <h3 className="text-lg font-semibold">AI Recommendations</h3>
                  </div>
                  
                  {recommendedPlayers && recommendedPlayers.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-white/70">
                        Based on performance analytics, these players are recommended for the {
                          selectedPosition ? currentFormation.positions.find(p => p.id === selectedPosition)?.name || selectedPosition : 'selected'
                        } position:
                      </p>
                      {recommendedPlayers.map(player => (
                        <div 
                          key={player.id}
                          className="bg-sportiq-gold/10 p-3 rounded-lg cursor-pointer hover:bg-sportiq-gold/20 transition-colors"
                          onClick={() => {
                            if (selectedPosition) {
                              togglePlayerSelection(player);
                            } else {
                              toast({
                                title: "Select a position first",
                                description: "Click on a position in the formation display to place this player",
                              });
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-sportiq-gold/20 flex items-center justify-center">
                              <User className="h-5 w-5 text-sportiq-gold" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{player.name}</p>
                              <div className="flex items-center gap-2 text-xs text-white/70">
                                <span>{player.team}</span>
                                <span>•</span>
                                <span>{player.position}</span>
                                <span>•</span>
                                <span className="text-sportiq-green">£{player.price}m</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs bg-sportiq-purple/20 text-sportiq-purple px-1.5 py-0.5 rounded">
                                  {player.points} pts
                                </span>
                                <span className="text-xs bg-sportiq-green/20 text-sportiq-green px-1.5 py-0.5 rounded">
                                  Form: {player.form}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-white/70 text-center py-6">
                      {selectedPosition ? (
                        <p>Select a position on the formation to get player recommendations</p>
                      ) : (
                        <p>Click on a position in the formation to get position-specific recommendations</p>
                      )}
                    </div>
                  )}
                </GlassCard>
                
                {/* Team Balance */}
                <GlassCard className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Team Balance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activeSport === 'football' ? 'Attack' : 'Batting'}</span>
                        <span>{teamBalance.attack > 75 ? 'Excellent' : teamBalance.attack > 50 ? 'Good' : teamBalance.attack > 25 ? 'Average' : 'Poor'}</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-green rounded-full" style={{ width: `${teamBalance.attack}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activeSport === 'football' ? 'Midfield' : 'All-rounders'}</span>
                        <span>{teamBalance.midfield > 75 ? 'Excellent' : teamBalance.midfield > 50 ? 'Good' : teamBalance.midfield > 25 ? 'Average' : 'Poor'}</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-blue rounded-full" style={{ width: `${teamBalance.midfield}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activeSport === 'football' ? 'Defense' : 'Bowling'}</span>
                        <span>{teamBalance.defense > 75 ? 'Excellent' : teamBalance.defense > 50 ? 'Good' : teamBalance.defense > 25 ? 'Average' : 'Poor'}</span>
                      </div>
                      <div className="h-2 bg-sportiq-lightgray/20 rounded-full">
                        <div className="h-full bg-sportiq-gold rounded-full" style={{ width: `${teamBalance.defense}%` }}></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Performance Metrics */}
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
                              const positionCategory = activeSport === 'football'
                                ? player.position.includes('Forward') ? 'Forward' :
                                  player.position.includes('Midfielder') ? 'Midfielder' : 
                                  player.position.includes('Defender') ? 'Defender' : 'Goalkeeper'
                                : player.position.includes('Batsman') ? 'Batsman' :
                                  player.position.includes('Bowler') ? 'Bowler' :
                                  player.position.includes('Wicketkeeper') ? 'Wicketkeeper' : 'All-rounder';
                              
                              acc[positionCategory] = (acc[positionCategory] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([position, count]) => (
                            <div key={position}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-white">{position}</span>
                                <span className="text-white">{count}</span>
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
                                        : position.includes('Defender') || position.includes('Bowler')
                                          ? '#f59e0b' // gold
                                          : '#8b5cf6' // purple for goalkeeper/wicketkeeper
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

                {/* AI Recommendations */}
                <GlassCard className="p-4">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-5 w-5 text-sportiq-gold mr-2" />
                    <h3 className="text-lg font-semibold">Prediction Insights</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {activeSport === 'football' && (
                      <>
                        <div className="bg-sportiq-blue/10 p-3 rounded-lg border border-sportiq-blue/30">
                          <p className="text-sm">Manchester City players have 82% higher chance of scoring in the next fixture, consider adding more City attackers.</p>
                        </div>
                        <div className="bg-sportiq-gold/10 p-3 rounded-lg border border-sportiq-gold/30">
                          <p className="text-sm">Liverpool defenders are predicted to keep 3 clean sheets in the next 4 games.</p>
                        </div>
                        <div className="bg-sportiq-purple/10 p-3 rounded-lg border border-sportiq-purple/30">
                          <p className="text-sm">Kevin De Bruyne is expected to create 35% more chances in the next game compared to his season average.</p>
                        </div>
                      </>
                    )}
                    {activeSport === 'cricket' && (
                      <>
                        <div className="bg-sportiq-blue/10 p-3 rounded-lg border border-sportiq-blue/30">
                          <p className="text-sm">The pitch for the next Karachi Kings match favors spinners, consider adding more spin bowlers.</p>
                        </div>
                        <div className="bg-sportiq-gold/10 p-3 rounded-lg border border-sportiq-gold/30">
                          <p className="text-sm">Babar Azam is predicted to score 15% more runs in the upcoming fixture based on historical data.</p>
                        </div>
                        <div className="bg-sportiq-purple/10 p-3 rounded-lg border border-sportiq-purple/30">
                          <p className="text-sm">Mumbai Indians all-rounders have 75% higher chance of getting wickets in the next match.</p>
                        </div>
                      </>
                    )}
                    <div className="bg-sportiq-green/10 p-3 rounded-lg border border-sportiq-green/30">
                      <p className="text-sm">Our AI predicts your current squad has a 68% chance of outperforming the average in the next gameweek.</p>
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
