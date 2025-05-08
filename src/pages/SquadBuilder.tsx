
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Filter, Search, Save, Download } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { squadPlayers } from '@/data/sampleData';
import { premierLeaguePlayers } from '@/data/additionalPlayers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { toast } from '@/components/ui/use-toast';
import { PlayerType, PositionSlot, FormationTemplate } from '@/types/player';
import PositionSlotComponent from '@/components/squad-builder/PositionSlot';
import PlayerSelection from '@/components/squad-builder/PlayerSelection';
import PerformanceMetrics from '@/components/squad-builder/PerformanceMetrics';
import AutoTeamGenerator from '@/components/squad-builder/AutoTeamGenerator';

const SquadBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'football' | 'cricket'>('football');
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedPositionSlot, setSelectedPositionSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  const [viewMode, setViewMode] = useState<'manual' | 'auto'>('manual');
  const [activeFormation, setActiveFormation] = useState<'442' | '433' | '352'>('442');
  const [positionSlots, setPositionSlots] = useState<PositionSlot[]>([]);

  // Team formation and position requirements
  const formations: Record<string, FormationTemplate> = {
    balanced: {
      name: "4-4-2 (Balanced)",
      positions: {
        Goalkeeper: 1,
        Defender: 4,
        Midfielder: 4,
        Forward: 2
      }
    },
    defensive: {
      name: "5-3-2 (Defensive)",
      positions: {
        Goalkeeper: 1,
        Defender: 5,
        Midfielder: 3,
        Forward: 2
      }
    },
    attacking: {
      name: "4-3-3 (Attacking)",
      positions: {
        Goalkeeper: 1,
        Defender: 4,
        Midfielder: 3,
        Forward: 3
      }
    }
  };

  // Define formation layouts with position coordinates
  const formationLayouts: Record<string, {positions: {id: string; type: string; x: number; y: number}[]}> = {
    '442': {
      positions: [
        { id: 'gk_1', type: 'GK', x: 50, y: 90 },
        { id: 'def_1', type: 'LB', x: 20, y: 75 },
        { id: 'def_2', type: 'CB', x: 40, y: 75 },
        { id: 'def_3', type: 'CB', x: 60, y: 75 },
        { id: 'def_4', type: 'RB', x: 80, y: 75 },
        { id: 'mid_1', type: 'LM', x: 20, y: 55 },
        { id: 'mid_2', type: 'CM', x: 40, y: 55 },
        { id: 'mid_3', type: 'CM', x: 60, y: 55 },
        { id: 'mid_4', type: 'RM', x: 80, y: 55 },
        { id: 'fwd_1', type: 'ST', x: 35, y: 30 },
        { id: 'fwd_2', type: 'ST', x: 65, y: 30 },
      ]
    },
    '433': {
      positions: [
        { id: 'gk_1', type: 'GK', x: 50, y: 90 },
        { id: 'def_1', type: 'LB', x: 20, y: 75 },
        { id: 'def_2', type: 'CB', x: 40, y: 75 },
        { id: 'def_3', type: 'CB', x: 60, y: 75 },
        { id: 'def_4', type: 'RB', x: 80, y: 75 },
        { id: 'mid_1', type: 'CM', x: 30, y: 55 },
        { id: 'mid_2', type: 'CM', x: 50, y: 55 },
        { id: 'mid_3', type: 'CM', x: 70, y: 55 },
        { id: 'fwd_1', type: 'LW', x: 20, y: 30 },
        { id: 'fwd_2', type: 'ST', x: 50, y: 30 },
        { id: 'fwd_3', type: 'RW', x: 80, y: 30 },
      ]
    },
    '352': {
      positions: [
        { id: 'gk_1', type: 'GK', x: 50, y: 90 },
        { id: 'def_1', type: 'CB', x: 30, y: 75 },
        { id: 'def_2', type: 'CB', x: 50, y: 75 },
        { id: 'def_3', type: 'CB', x: 70, y: 75 },
        { id: 'def_4', type: 'LWB', x: 15, y: 65 },
        { id: 'def_5', type: 'RWB', x: 85, y: 65 },
        { id: 'mid_1', type: 'CM', x: 30, y: 50 },
        { id: 'mid_2', type: 'CM', x: 50, y: 50 },
        { id: 'mid_3', type: 'CM', x: 70, y: 50 },
        { id: 'fwd_1', type: 'ST', x: 35, y: 30 },
        { id: 'fwd_2', type: 'ST', x: 65, y: 30 },
      ]
    },
  };

  const cricketPositions = [
    { id: 'bat_1', type: 'Opener', x: 30, y: 20 },
    { id: 'bat_2', type: 'Opener', x: 50, y: 20 },
    { id: 'bat_3', type: 'Top-order', x: 70, y: 20 },
    { id: 'bat_4', type: 'Middle-order', x: 30, y: 40 },
    { id: 'bat_5', type: 'Middle-order', x: 50, y: 40 },
    { id: 'all_1', type: 'All-rounder', x: 70, y: 40 },
    { id: 'all_2', type: 'All-rounder', x: 30, y: 60 },
    { id: 'bowl_1', type: 'Bowler', x: 50, y: 60 },
    { id: 'bowl_2', type: 'Bowler', x: 70, y: 60 },
    { id: 'bowl_3', type: 'Bowler', x: 40, y: 80 },
    { id: 'wk_1', type: 'Wicketkeeper', x: 60, y: 80 },
  ];

  const getPositionsForFormation = (formation: string) => {
    return formationLayouts[formation].positions;
  };

  const getCricketPositions = () => {
    return cricketPositions;
  };

  // Initialize position slots when formation changes
  useEffect(() => {
    clearSquad();
  }, [activeFormation, activeTab]);

  const clearSquad = () => {
    const positions = activeTab === 'football' 
      ? getPositionsForFormation(activeFormation) 
      : getCricketPositions();
      
    const newPositionSlots: PositionSlot[] = positions.map(pos => ({
      id: pos.id,
      type: pos.type,
      filled: false,
      player: null,
      position: { x: pos.x, y: pos.y }
    }));
    
    setPositionSlots(newPositionSlots);
    setSelectedPosition(null);
    setSelectedPositionSlot(null);
    setSelectedPlayer(null);
  };

  const handleSelectPosition = (slotId: string) => {
    const slot = positionSlots.find(slot => slot.id === slotId);
    if (slot) {
      setSelectedPosition(slot.type);
      setSelectedPositionSlot(slotId);
      setSelectedPlayer(slot.player);
    }
  };

  // Filter players based on position and search query
  const getFilteredPlayers = () => {
    const positionMap: Record<string, string[]> = {
      // Football
      'GK': ['Goalkeeper'],
      'LB': ['Defender'],
      'CB': ['Defender'],
      'RB': ['Defender'],
      'LM': ['Midfielder'],
      'CM': ['Midfielder'],
      'RM': ['Midfielder'],
      'LW': ['Forward'],
      'ST': ['Forward'],
      'RW': ['Forward'],
      'LWB': ['Defender'],
      'RWB': ['Defender'],
      
      // Cricket
      'Opener': ['Batsman'],
      'Top-order': ['Batsman'],
      'Middle-order': ['Batsman'],
      'All-rounder': ['All-rounder'],
      'Bowler': ['Bowler'],
      'Wicketkeeper': ['Wicketkeeper']
    };

    const allPlayers = activeTab === 'football'
      ? [...squadPlayers.filter(p => p.sport === 'football'), ...premierLeaguePlayers]
      : squadPlayers.filter(p => p.sport === 'cricket');

    // Get relevant positions for the selected position slot
    const relevantPositions = selectedPosition ? positionMap[selectedPosition] || [] : [];

    // Get the ID of the currently selected player
    const selectedPlayerId = positionSlots.find(slot => slot.id === selectedPositionSlot)?.player?.id;

    // Filter players: must match position type and not be used in other slots
    const players = allPlayers.filter(player => {
      // Check if player is already used in another slot
      const isUsedElsewhere = positionSlots.some(slot => 
        slot.player?.id === player.id && slot.id !== selectedPositionSlot
      );

      // Include player if it matches position and is either not used elsewhere or is currently selected
      return (
        relevantPositions.includes(player.position) &&
        (!isUsedElsewhere || player.id === selectedPlayerId) &&
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Sort players by points (highest first)
    return players.sort((a, b) => b.points - a.points);
  };

  const handleSelectPlayer = (player: PlayerType) => {
    if (selectedPositionSlot) {
      // Create new list with updated position slot
      const updatedSlots = positionSlots.map(slot => {
        if (slot.id === selectedPositionSlot) {
          return {
            ...slot,
            filled: true,
            player: { ...player, positionSlot: slot.id }
          };
        }
        return slot;
      });
      
      setPositionSlots(updatedSlots);
      setSelectedPlayer(player);
      
      toast({
        title: "Player selected",
        description: `${player.name} added as ${selectedPosition}`,
      });
    }
  };

  const handleApplyAutoTeam = (players: PlayerType[]) => {
    clearSquad(); // Clear the current squad first
    
    // Map auto-generated team to position slots
    const newPositionSlots = [...positionSlots];
    
    // For each player in generated team, find an appropriate slot
    players.forEach(player => {
      const position = player.position;
      
      // Find an empty slot with matching position type
      const slotIndex = newPositionSlots.findIndex(slot => {
        // Match position to slot type using the positionMap logic
        if (position === 'Goalkeeper' && slot.type === 'GK') return true;
        if (position === 'Defender' && ['LB', 'CB', 'RB', 'LWB', 'RWB'].includes(slot.type)) return true;
        if (position === 'Midfielder' && ['LM', 'CM', 'RM'].includes(slot.type)) return true;
        if (position === 'Forward' && ['ST', 'LW', 'RW'].includes(slot.type)) return true;
        return false;
      });
      
      if (slotIndex !== -1) {
        // Assign player to this slot
        newPositionSlots[slotIndex] = {
          ...newPositionSlots[slotIndex],
          filled: true,
          player: { ...player, positionSlot: newPositionSlots[slotIndex].id }
        };
      }
    });
    
    setPositionSlots(newPositionSlots);
  };

  const saveTeam = () => {
    const filledPositions = positionSlots.filter(slot => slot.filled).length;
    const totalPositions = positionSlots.length;
    
    // Calculate team stats
    const selectedPlayers = positionSlots.filter(slot => slot.filled).map(slot => slot.player);
    const totalPoints = selectedPlayers.reduce((sum, player) => sum + (player?.points || 0), 0);
    const averagePoints = totalPoints / (filledPositions || 1);
    
    toast({
      title: `Squad ${filledPositions === totalPositions ? 'Saved' : 'Updated'}`,
      description: `${filledPositions}/${totalPositions} positions filled, Avg points: ${averagePoints.toFixed(1)}`,
    });
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h1 className="text-3xl font-bold text-gradient">Squad Builder</h1>
              
              <div className="flex items-center gap-2">
                <Tabs defaultValue="football" value={activeTab} onValueChange={(value) => setActiveTab(value as 'football' | 'cricket')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="football">Football</TabsTrigger>
                    <TabsTrigger value="cricket">Cricket</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button className="flex items-center gap-2" variant="outline" onClick={saveTeam}>
                  <Save className="h-4 w-4" />
                  Save Squad
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Formation selector and visual pitch */}
              <div className="w-full lg:w-2/3 space-y-4">
                <GlassCard className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Lineup</h2>
                    
                    <div className="flex gap-2">
                      {activeTab === 'football' && (
                        <Select value={activeFormation} onValueChange={(value) => setActiveFormation(value as '442' | '433' | '352')}>
                          <SelectTrigger className="w-[140px] bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                            <SelectValue placeholder="Formation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="442">4-4-2</SelectItem>
                            <SelectItem value="433">4-3-3</SelectItem>
                            <SelectItem value="352">3-5-2</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      
                      <Button variant="outline" onClick={clearSquad}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  {/* Visual Pitch/Field */}
                  <div className={cn(
                    "relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4",
                    activeTab === 'football' ? "bg-sportiq-green/50" : "bg-sportiq-brown/50"
                  )}>
                    {/* Field markings */}
                    {activeTab === 'football' && (
                      <>
                        <div className="absolute inset-0 border-2 border-white/30"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4 border-b-2 border-x-2 border-white/30"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4 border-t-2 border-x-2 border-white/30"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/30"></div>
                        <div className="absolute top-1/2 left-0 h-px w-full bg-white/30"></div>
                      </>
                    )}
                    
                    {activeTab === 'cricket' && (
                      <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-2/3 bg-sportiq-brown/80 rounded-lg"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/2 bg-sportiq-lightgray/20 rounded-md border border-white/30"></div>
                      </>
                    )}
                    
                    {/* Position slots */}
                    {positionSlots.map(slot => (
                      <PositionSlotComponent
                        key={slot.id}
                        slot={slot}
                        onSelectPosition={handleSelectPosition}
                        isSelected={selectedPositionSlot === slot.id}
                        activeFormation={activeFormation}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-2 bg-sportiq-lightgray/20 p-2 rounded">
                      <p className="text-xs text-white/70">Positions Filled</p>
                      <p className="text-lg font-bold">
                        {positionSlots.filter(slot => slot.filled).length}/{positionSlots.length}
                      </p>
                    </div>
                    <div className="col-span-3 bg-sportiq-lightgray/20 p-2 rounded">
                      <p className="text-xs text-white/70">Total Points</p>
                      <p className="text-lg font-bold">
                        {positionSlots
                          .filter(slot => slot.filled)
                          .reduce((total, slot) => total + (slot.player?.points || 0), 0)}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              {/* Right sidebar with player selection or auto team */}
              <div className="w-full lg:w-1/3 space-y-4">
                <GlassCard className="p-4">
                  <div className="flex mb-4">
                    <Tabs defaultValue="manual" value={viewMode} onValueChange={(value) => setViewMode(value as 'manual' | 'auto')} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual">Manual Selection</TabsTrigger>
                        <TabsTrigger value="auto">Auto Team</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="h-[500px]">
                    {viewMode === 'manual' ? (
                      <div className="h-full flex flex-col">
                        <div className="flex-1">
                          <PlayerSelection
                            availablePlayers={getFilteredPlayers()}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onSelectPlayer={handleSelectPlayer}
                            selectedPosition={selectedPosition}
                          />
                        </div>
                        
                        {selectedPlayer && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <PerformanceMetrics player={selectedPlayer} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <AutoTeamGenerator
                        availablePlayers={
                          activeTab === 'football'
                            ? [...squadPlayers.filter(p => p.sport === 'football'), ...premierLeaguePlayers]
                            : squadPlayers.filter(p => p.sport === 'cricket')
                        }
                        formations={formations}
                        onApplyTeam={handleApplyAutoTeam}
                        sport={activeTab}
                      />
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
