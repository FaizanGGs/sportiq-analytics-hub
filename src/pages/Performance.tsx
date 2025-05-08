
import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, ScatterChart, PieChart, AreaChart } from 'recharts';
import { Bar, Line, Scatter, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { User, Search, FilterX, Filter, Calendar, Download, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { squadPlayers, performanceStats } from '@/data/sampleData';
import { premierLeaguePlayers } from '@/data/additionalPlayers';
import { toast } from '@/components/ui/use-toast';

type PlayerType = {
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

// Team formation and position requirements
type FormationTemplate = {
  name: string;
  positions: {
    Goalkeeper?: number;
    Defender: number;
    Midfielder: number;
    Forward: number;
  };
};

// Define different formations
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

// Combine player data
const allFootballPlayers = [...squadPlayers.filter(player => player.sport === 'football'), ...premierLeaguePlayers];
const allCricketPlayers = squadPlayers.filter(player => player.sport === 'cricket');

const Performance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  const [selectedSport, setSelectedSport] = useState<'football' | 'cricket'>('football');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'performance' | 'comparison' | 'auto-team'>('performance');
  const [selectedStatistic, setSelectedStatistic] = useState('points');
  const [timeRange, setTimeRange] = useState('season');
  const [comparisonPlayers, setComparisonPlayers] = useState<PlayerType[]>([]);
  const [teamType, setTeamType] = useState<'balanced' | 'defensive' | 'attacking'>('balanced');
  const [autoTeam, setAutoTeam] = useState<PlayerType[]>([]);
  const [showAutoTeam, setShowAutoTeam] = useState(false);

  // Define colors for charts
  const chartColors = {
    primary: '#3b82f6', // blue
    secondary: '#10b981', // green
    accent: '#8b5cf6', // purple
    highlight: '#f59e0b', // gold
    background: '#333',
    text: '#ffffff'
  };

  // Pie chart custom colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Filter players based on search query and selected sport
  const filteredPlayers = selectedSport === 'football' 
    ? allFootballPlayers.filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCricketPlayers.filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Generate player performance data for charts
  const generatePlayerPerformanceData = (player: PlayerType | null) => {
    if (!player) return [];
    
    // Generate last 10 matches data
    return Array.from({ length: 10 }, (_, i) => {
      const match = i + 1;
      let value = 0;
      
      if (selectedSport === 'football') {
        if (selectedStatistic === 'points') {
          // Random points between 2-12 with some pattern
          value = 2 + Math.floor(Math.random() * 10);
          // Add some pattern
          if (i % 3 === 0) value += 3;
          if (i % 5 === 0) value += 2;
        } else if (selectedStatistic === 'goals') {
          // Goals for forwards: 0-3, midfielders: 0-2, defenders: 0-1
          const max = player.position === 'Forward' ? 3 : player.position === 'Midfielder' ? 2 : 1;
          value = Math.floor(Math.random() * (max + 1));
        } else if (selectedStatistic === 'assists') {
          // Assists based on position
          const max = player.position === 'Midfielder' ? 2 : player.position === 'Forward' ? 1 : 1;
          value = Math.floor(Math.random() * (max + 1));
        } else if (selectedStatistic === 'cleanSheets' && (player.position === 'Defender' || player.position === 'Goalkeeper')) {
          // Clean sheets: 0 or 1
          value = Math.random() > 0.6 ? 1 : 0;
        }
      } else if (selectedSport === 'cricket') {
        if (selectedStatistic === 'points') {
          // Random points between 5-25
          value = 5 + Math.floor(Math.random() * 20);
        } else if (selectedStatistic === 'runs' && (player.position === 'Batsman' || player.position === 'All-rounder')) {
          // Runs for batsmen: 0-100, all-rounders: 0-50
          const max = player.position === 'Batsman' ? 100 : 50;
          value = Math.floor(Math.random() * max);
        } else if (selectedStatistic === 'wickets' && (player.position === 'Bowler' || player.position === 'All-rounder')) {
          // Wickets: 0-5
          value = Math.floor(Math.random() * 6);
        } else if (selectedStatistic === 'dismissals' && player.position === 'Wicketkeeper') {
          // Wicketkeeper dismissals: 0-4
          value = Math.floor(Math.random() * 5);
        }
      }
      
      return {
        match: `Match ${match}`,
        value
      };
    });
  };

  // Generate data for the scatter plot
  const generateScatterData = (player: PlayerType | null) => {
    if (!player) return [];
    
    return Array.from({ length: 15 }, (_, i) => {
      const match = i + 1;
      
      if (selectedSport === 'football') {
        return {
          minutes: 60 + Math.floor(Math.random() * 30),
          value: 2 + Math.floor(Math.random() * 10),
          match: `Match ${match}`
        };
      } else {
        return {
          ballsFaced: 10 + Math.floor(Math.random() * 40),
          value: 5 + Math.floor(Math.random() * 90),
          match: `Match ${match}`
        };
      }
    });
  };

  // Generate data for player comparison
  const generateComparisonData = () => {
    const stats = selectedSport === 'football' 
      ? ['points', 'goals', 'assists', 'minutes'] 
      : ['points', 'runs', 'wickets', 'economy'];
    
    return stats.map(stat => {
      const data: any = { name: stat };
      
      comparisonPlayers.forEach(player => {
        if (player.stats && player.stats[stat] !== undefined) {
          data[player.name] = player.stats[stat];
        } else if (stat === 'points') {
          data[player.name] = player.points;
        } else {
          data[player.name] = Math.floor(Math.random() * 50);
        }
      });
      
      return data;
    });
  };

  // Generate pie chart data
  const generatePieData = (player: PlayerType | null) => {
    if (!player) return [];
    
    if (selectedSport === 'football') {
      return [
        { name: 'Goals', value: player.stats?.goals as number || 0 },
        { name: 'Assists', value: player.stats?.assists as number || 0 },
        { name: 'Clean Sheets', value: player.stats?.cleanSheets as number || 0 },
        { name: 'Minutes', value: (player.stats?.minutesPlayed as number || 0) / 100 }
      ];
    } else {
      return [
        { name: 'Runs', value: player.stats?.runs as number || 0 },
        { name: 'Wickets', value: player.stats?.wickets as number || 0 },
        { name: 'Strike Rate', value: player.stats?.strikeRate as number || 0 },
        { name: 'Economy', value: player.stats?.economy as number || 0 }
      ].filter(item => item.value > 0);
    }
  };

  // Toggle player selection for comparison
  const togglePlayerComparison = (player: PlayerType) => {
    if (comparisonPlayers.some(p => p.id === player.id)) {
      setComparisonPlayers(comparisonPlayers.filter(p => p.id !== player.id));
    } else {
      if (comparisonPlayers.length < 3) {
        setComparisonPlayers([...comparisonPlayers, player]);
      }
    }
  };

  // Get relevant statistics based on sport and position
  const getRelevantStats = (player: PlayerType | null) => {
    if (!player) return [];
    
    if (selectedSport === 'football') {
      if (player.position === 'Forward') {
        return ['points', 'goals', 'assists', 'minutes'];
      } else if (player.position === 'Midfielder') {
        return ['points', 'assists', 'goals', 'minutes'];
      } else if (player.position === 'Defender') {
        return ['points', 'cleanSheets', 'goals', 'minutes'];
      } else {
        return ['points', 'cleanSheets', 'saves', 'minutes'];
      }
    } else { // Cricket
      if (player.position === 'Batsman') {
        return ['points', 'runs', 'strikeRate', 'avg'];
      } else if (player.position === 'Bowler') {
        return ['points', 'wickets', 'economy', 'bowling_avg'];
      } else if (player.position === 'All-rounder') {
        return ['points', 'runs', 'wickets', 'strikeRate'];
      } else {
        return ['points', 'dismissals', 'runs', 'strikeRate'];
      }
    }
  };

  // Auto-team selection logic
  const generateAutoTeam = () => {
    if (selectedSport !== 'football') {
      toast({
        title: "Auto-team currently only available for football",
        description: "Cricket auto-team selection will be coming soon!",
        variant: "destructive"
      });
      return;
    }

    const formation = formations[teamType];
    const requiredPositions = formation.positions;
    const newTeam: PlayerType[] = [];

    // Get players for each position based on points
    const sortedPlayers: Record<string, PlayerType[]> = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Forward: []
    };

    // Sort players by position and points
    allFootballPlayers.forEach(player => {
      if (sortedPlayers[player.position]) {
        sortedPlayers[player.position].push(player);
      }
    });

    // Sort each position group by points (highest first)
    Object.keys(sortedPlayers).forEach(pos => {
      sortedPlayers[pos].sort((a, b) => b.points - a.points);
    });

    // Build team according to formation
    Object.keys(requiredPositions).forEach(position => {
      const count = requiredPositions[position as keyof typeof requiredPositions];
      const bestPlayers = sortedPlayers[position].slice(0, count);
      newTeam.push(...bestPlayers);
    });

    setAutoTeam(newTeam);
    setShowAutoTeam(true);
    
    toast({
      title: `${formation.name} team generated!`,
      description: `Created a team with ${newTeam.length} players based on highest points.`
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
              <h1 className="text-3xl font-bold text-gradient">Player Performance</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex rounded-md overflow-hidden">
                  <Button 
                    variant={selectedSport === 'football' ? "default" : "outline"} 
                    className={selectedSport === 'football' ? "bg-sportiq-blue hover:bg-sportiq-blue/90" : "bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"}
                    onClick={() => setSelectedSport('football')}
                  >
                    Football
                  </Button>
                  <Button 
                    variant={selectedSport === 'cricket' ? "default" : "outline"} 
                    className={selectedSport === 'cricket' ? "bg-sportiq-purple hover:bg-sportiq-purple/90" : "bg-sportiq-purple/10 text-sportiq-purple hover:bg-sportiq-purple/20"}
                    onClick={() => setSelectedSport('cricket')}
                  >
                    Cricket
                  </Button>
                </div>
                
                <div className="flex rounded-md overflow-hidden">
                  <Button 
                    variant={view === 'performance' ? "default" : "outline"} 
                    className={view === 'performance' ? "bg-sportiq-blue hover:bg-sportiq-blue/90" : "bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"}
                    onClick={() => setView('performance')}
                  >
                    Single
                  </Button>
                  <Button 
                    variant={view === 'comparison' ? "default" : "outline"} 
                    className={view === 'comparison' ? "bg-sportiq-purple hover:bg-sportiq-purple/90" : "bg-sportiq-purple/10 text-sportiq-purple hover:bg-sportiq-purple/20"}
                    onClick={() => setView('comparison')}
                  >
                    Compare
                  </Button>
                  <Button 
                    variant={view === 'auto-team' ? "default" : "outline"} 
                    className={view === 'auto-team' ? "bg-sportiq-gold hover:bg-sportiq-gold/90 text-black" : "bg-sportiq-gold/10 text-sportiq-gold hover:bg-sportiq-gold/20"}
                    onClick={() => setView('auto-team')}
                  >
                    Auto Team
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Player Selection */}
              <div className="w-full md:w-1/3 space-y-4">
                {view !== 'auto-team' ? (
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">
                        {view === 'comparison' ? 'Compare Players' : 'Select Player'}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => setComparisonPlayers([])}
                          disabled={comparisonPlayers.length === 0}
                        >
                          <FilterX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                      <Input 
                        className="pl-9 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        placeholder="Search players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {filteredPlayers.map(player => (
                        <div 
                          key={player.id}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3",
                            view === 'comparison' 
                              ? comparisonPlayers.some(p => p.id === player.id)
                                ? "bg-sportiq-gold/30 hover:bg-sportiq-gold/40"
                                : "bg-sportiq-lightgray/20 hover:bg-sportiq-lightgray/30"
                              : selectedPlayer?.id === player.id
                                ? "bg-sportiq-blue/30 hover:bg-sportiq-blue/40"
                                : "bg-sportiq-lightgray/20 hover:bg-sportiq-lightgray/30"
                          )}
                          onClick={() => view === 'comparison' 
                            ? togglePlayerComparison(player) 
                            : setSelectedPlayer(player)
                          }
                        >
                          <div className="h-10 w-10 rounded-full bg-sportiq-lightgray/30 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{player.name}</p>
                            <div className="flex text-xs text-white/70">
                              <span>{player.team}</span>
                              <span className="mx-1">•</span>
                              <span>{player.position}</span>
                            </div>
                          </div>
                          {view === 'comparison' && comparisonPlayers.some(p => p.id === player.id) && (
                            <div className="h-5 w-5 rounded-full bg-sportiq-gold/50 flex items-center justify-center text-xs font-bold">
                              {comparisonPlayers.findIndex(p => p.id === player.id) + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ) : (
                  <GlassCard className="p-4">
                    <h2 className="text-xl font-bold mb-4">Auto Team Generator</h2>
                    
                    <div className="mb-6">
                      <p className="text-white/70 mb-3">
                        Generate a team automatically based on player performance points. Choose your preferred style:
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant={teamType === 'balanced' ? "default" : "outline"}
                          className={teamType === 'balanced' ? "bg-sportiq-blue" : "bg-sportiq-blue/20 text-sportiq-blue hover:bg-sportiq-blue/30"}
                          onClick={() => setTeamType('balanced')}
                        >
                          Balanced
                        </Button>
                        <Button 
                          variant={teamType === 'defensive' ? "default" : "outline"}
                          className={teamType === 'defensive' ? "bg-sportiq-green" : "bg-sportiq-green/20 text-sportiq-green hover:bg-sportiq-green/30"}
                          onClick={() => setTeamType('defensive')}
                        >
                          Defensive
                        </Button>
                        <Button 
                          variant={teamType === 'attacking' ? "default" : "outline"}
                          className={teamType === 'attacking' ? "bg-sportiq-purple" : "bg-sportiq-purple/20 text-sportiq-purple hover:bg-sportiq-purple/30"}
                          onClick={() => setTeamType('attacking')}
                        >
                          Attacking
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Formation Details</h3>
                      <div className="bg-sportiq-lightgray/20 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{formations[teamType].name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(formations[teamType].positions).map(([position, count]) => (
                            <div key={position} className="flex justify-between items-center">
                              <span>{position}s</span>
                              <span className="bg-sportiq-lightgray/30 px-2 py-0.5 rounded">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-sportiq-gold text-black hover:bg-sportiq-gold/90"
                      onClick={generateAutoTeam}
                    >
                      Generate {teamType.charAt(0).toUpperCase() + teamType.slice(1)} Team
                    </Button>
                  </GlassCard>
                )}
                
                {selectedPlayer && view === 'performance' && (
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-bold mb-3">Player Overview</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-sportiq-blue/20 flex items-center justify-center">
                        <User className="h-8 w-8 text-sportiq-blue" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{selectedPlayer.name}</h4>
                        <p className="text-white/70">{selectedPlayer.team} • {selectedPlayer.position}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-sportiq-purple/20 text-sportiq-purple px-2 py-0.5 rounded text-xs">
                            {selectedPlayer.points} pts
                          </span>
                          <span className="bg-sportiq-green/20 text-sportiq-green px-2 py-0.5 rounded text-xs">
                            Form: {selectedPlayer.form}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm mb-2">Key Statistics</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSport === 'football' && (
                          <>
                            <div className="bg-sportiq-lightgray/20 rounded p-2">
                              <p className="text-xs text-white/70">Goals</p>
                              <p className="text-lg font-bold">{selectedPlayer.stats?.goals || 0}</p>
                            </div>
                            <div className="bg-sportiq-lightgray/20 rounded p-2">
                              <p className="text-xs text-white/70">Assists</p>
                              <p className="text-lg font-bold">{selectedPlayer.stats?.assists || 0}</p>
                            </div>
                            {selectedPlayer.position === 'Goalkeeper' || selectedPlayer.position === 'Defender' ? (
                              <div className="bg-sportiq-lightgray/20 rounded p-2">
                                <p className="text-xs text-white/70">Clean Sheets</p>
                                <p className="text-lg font-bold">{selectedPlayer.stats?.cleanSheets || 0}</p>
                              </div>
                            ) : (
                              <div className="bg-sportiq-lightgray/20 rounded p-2">
                                <p className="text-xs text-white/70">Shots On Target</p>
                                <p className="text-lg font-bold">{selectedPlayer.stats?.shotsOnTarget || 0}</p>
                              </div>
                            )}
                            <div className="bg-sportiq-lightgray/20 rounded p-2">
                              <p className="text-xs text-white/70">Minutes</p>
                              <p className="text-lg font-bold">{selectedPlayer.stats?.minutesPlayed || 0}</p>
                            </div>
                          </>
                        )}
                        
                        {selectedSport === 'cricket' && (
                          <>
                            {(selectedPlayer.position === 'Batsman' || selectedPlayer.position === 'All-rounder') && (
                              <>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Runs</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.runs || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Strike Rate</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.strikeRate || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Average</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.avg || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Centuries</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.centuries || 0}</p>
                                </div>
                              </>
                            )}
                            
                            {(selectedPlayer.position === 'Bowler' || selectedPlayer.position === 'All-rounder') && (
                              <>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Wickets</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.wickets || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Economy</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.economy || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Bowling Avg</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.bowling_avg || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Best Bowling</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.bestBowling || '-'}</p>
                                </div>
                              </>
                            )}
                            
                            {selectedPlayer.position === 'Wicketkeeper' && (
                              <>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Dismissals</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.dismissals || 0}</p>
                                </div>
                                <div className="bg-sportiq-lightgray/20 rounded p-2">
                                  <p className="text-xs text-white/70">Runs</p>
                                  <p className="text-lg font-bold">{selectedPlayer.stats?.runs || 0}</p>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>
              
              {/* Performance Visualizations */}
              <div className="w-full md:w-2/3 space-y-4">
                {view === 'performance' ? (
                  <>
                    {selectedPlayer ? (
                      <>
                        <GlassCard className="p-4">
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Performance Trends</h3>
                            <div className="flex items-center gap-2">
                              <Select 
                                value={selectedStatistic} 
                                onValueChange={(value) => setSelectedStatistic(value)}
                              >
                                <SelectTrigger className="w-[180px] bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                                  <SelectValue placeholder="Select Statistic" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getRelevantStats(selectedPlayer).map(stat => (
                                    <SelectItem key={stat} value={stat}>{stat.charAt(0).toUpperCase() + stat.slice(1)}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Select 
                                value={timeRange} 
                                onValueChange={(value) => setTimeRange(value)}
                              >
                                <SelectTrigger className="w-[150px] bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                                  <SelectValue placeholder="Time Range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="recent">Last 5 Matches</SelectItem>
                                  <SelectItem value="season">Season</SelectItem>
                                  <SelectItem value="allTime">All Time</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={generatePlayerPerformanceData(selectedPlayer)}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis 
                                  dataKey="match" 
                                  stroke={chartColors.text}
                                />
                                <YAxis stroke={chartColors.text} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: chartColors.background, 
                                    color: chartColors.text,
                                    border: `1px solid ${chartColors.primary}`
                                  }}
                                />
                                <Legend wrapperStyle={{ color: chartColors.text }} />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  name={selectedStatistic.charAt(0).toUpperCase() + selectedStatistic.slice(1)}
                                  stroke={chartColors.primary}
                                  strokeWidth={2}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </GlassCard>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <GlassCard className="p-4">
                            <h3 className="text-lg font-bold mb-4">Performance Distribution</h3>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={generatePlayerPerformanceData(selectedPlayer)}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                  <XAxis dataKey="match" stroke={chartColors.text} />
                                  <YAxis stroke={chartColors.text} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: chartColors.background, 
                                      color: chartColors.text,
                                      border: `1px solid ${chartColors.secondary}`
                                    }}
                                  />
                                  <Legend wrapperStyle={{ color: chartColors.text }} />
                                  <Bar dataKey="value" name={selectedStatistic.charAt(0).toUpperCase() + selectedStatistic.slice(1)} fill={chartColors.secondary} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </GlassCard>
                          
                          <GlassCard className="p-4">
                            <h3 className="text-lg font-bold mb-4">Performance Breakdown</h3>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={generatePieData(selectedPlayer)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {generatePieData(selectedPlayer).map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: chartColors.background, 
                                      color: chartColors.text,
                                      border: `1px solid ${chartColors.accent}`
                                    }}
                                  />
                                  <Legend formatter={(value) => <span style={{ color: chartColors.text }}>{value}</span>} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </GlassCard>
                        </div>
                      </>
                    ) : (
                      <GlassCard className="p-6 text-center">
                        <User className="h-12 w-12 mx-auto text-white/30 mb-3" />
                        <h3 className="text-xl font-medium text-white/70">Select a player to view stats</h3>
                        <p className="text-white/50 mt-2">Player statistics and performance trends will appear here</p>
                      </GlassCard>
                    )}
                  </>
                ) : view === 'comparison' ? (
                  <>
                    {comparisonPlayers.length > 0 ? (
                      <>
                        <GlassCard className="p-4">
                          <h3 className="text-lg font-bold mb-4">Player Comparison</h3>
                          
                          <div className="mb-6 overflow-x-auto">
                            <Table>
                              <TableHeader className="bg-sportiq-lightgray/10">
                                <TableRow>
                                  <TableHead>Stats</TableHead>
                                  {comparisonPlayers.map(player => (
                                    <TableHead key={player.id}>
                                      <div className="flex flex-col items-center">
                                        <div className="h-8 w-8 rounded-full bg-sportiq-lightgray/30 flex items-center justify-center mb-1">
                                          <User className="h-4 w-4 text-white" />
                                        </div>
                                        <span>{player.name}</span>
                                        <span className="text-xs text-white/50">{player.team}</span>
                                      </div>
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">Points</TableCell>
                                  {comparisonPlayers.map(player => (
                                    <TableCell key={player.id} className="text-center font-bold text-sportiq-blue">
                                      {player.points}
                                    </TableCell>
                                  ))}
                                </TableRow>
                                {selectedSport === 'football' && (
                                  <>
                                    <TableRow>
                                      <TableCell className="font-medium">Goals</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.goals || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Assists</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.assists || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Minutes</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.minutesPlayed || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Price</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center flex justify-center">
                                          <div className="flex items-center">
                                            <DollarSign className="h-4 w-4 mr-1 text-sportiq-gold" />
                                            <span>{player.price.toFixed(1)}</span>
                                          </div>
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Form</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          <span className="bg-sportiq-green/20 text-sportiq-green px-2 py-0.5 rounded">
                                            {player.form}
                                          </span>
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </>
                                )}
                                {selectedSport === 'cricket' && (
                                  <>
                                    <TableRow>
                                      <TableCell className="font-medium">Runs</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.runs || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Wickets</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.wickets || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium">Strike Rate</TableCell>
                                      {comparisonPlayers.map(player => (
                                        <TableCell key={player.id} className="text-center">
                                          {player.stats?.strikeRate || 0}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div className="text-center text-white/50 text-sm">
                            {comparisonPlayers.length < 3 && `You can add ${3 - comparisonPlayers.length} more player${3 - comparisonPlayers.length > 1 ? 's' : ''} to compare`}
                          </div>
                        </GlassCard>
                      </>
                    ) : (
                      <GlassCard className="p-6 text-center">
                        <User className="h-12 w-12 mx-auto text-white/30 mb-3" />
                        <h3 className="text-xl font-medium text-white/70">Select players to compare</h3>
                        <p className="text-white/50 mt-2">You can compare up to 3 players side by side</p>
                      </GlassCard>
                    )}
                  </>
                ) : (
                  <>
                    {showAutoTeam && autoTeam.length > 0 ? (
                      <GlassCard className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold">{formations[teamType].name} Auto Team</h3>
                          <Button 
                            variant="outline" 
                            className="h-8 text-xs bg-sportiq-lightgray/10"
                            onClick={() => setShowAutoTeam(false)}
                          >
                            Generate New
                          </Button>
                        </div>
                        
                        <div className="mb-4 bg-sportiq-lightgray/10 p-3 rounded-lg">
                          <h4 className="font-medium mb-2">Team Formation</h4>
                          <div className="flex justify-between text-sm">
                            <span>GK: {autoTeam.filter(p => p.position === 'Goalkeeper').length}</span>
                            <span>DEF: {autoTeam.filter(p => p.position === 'Defender').length}</span>
                            <span>MID: {autoTeam.filter(p => p.position === 'Midfielder').length}</span>
                            <span>FWD: {autoTeam.filter(p => p.position === 'Forward').length}</span>
                          </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader className="bg-sportiq-lightgray/10">
                              <TableRow>
                                <TableHead>Player</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Points</TableHead>
                                <TableHead>Price</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {autoTeam.map(player => (
                                <TableRow key={player.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="h-8 w-8 rounded-full bg-sportiq-lightgray/30 flex items-center justify-center">
                                        <User className="h-4 w-4 text-white" />
                                      </div>
                                      <span className="font-medium">{player.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{player.position}</TableCell>
                                  <TableCell>{player.team}</TableCell>
                                  <TableCell>
                                    <span className="bg-sportiq-blue/20 text-sportiq-blue px-2 py-0.5 rounded">
                                      {player.points}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1 text-sportiq-gold" />
                                      <span>{player.price.toFixed(1)}</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="mt-4 bg-sportiq-lightgray/10 p-3 rounded-lg">
                          <h4 className="font-medium mb-2">Team Summary</h4>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-white/70">Total Points</div>
                              <div className="text-xl font-bold text-sportiq-blue">
                                {autoTeam.reduce((sum, player) => sum + player.points, 0)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-white/70">Avg. Points per Player</div>
                              <div className="text-xl font-bold text-sportiq-purple">
                                {(autoTeam.reduce((sum, player) => sum + player.points, 0) / autoTeam.length).toFixed(1)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-white/70">Total Cost</div>
                              <div className="text-xl font-bold flex items-center text-sportiq-gold">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {autoTeam.reduce((sum, player) => sum + player.price, 0).toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ) : (
                      <GlassCard className="p-6 text-center">
                        <TrendingUp className="h-12 w-12 mx-auto text-white/30 mb-3" />
                        <h3 className="text-xl font-medium text-white/70">Generate your auto team</h3>
                        <p className="text-white/50 mt-2">Select your preferred formation type and generate your optimal team</p>
                      </GlassCard>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
