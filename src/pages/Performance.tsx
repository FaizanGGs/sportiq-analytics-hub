import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, ScatterChart, PieChart, AreaChart } from 'recharts';
import { Bar, Line, Scatter, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { User, Search, FilterX, Filter, Calendar, Download, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { squadPlayers, performanceStats } from '@/data/sampleData';
import PlayerComparison3D from '@/components/animations/PlayerComparison3D';

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

const Performance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  const [selectedSport, setSelectedSport] = useState<'football' | 'cricket'>('football');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'performance' | 'comparison'>('performance');
  const [selectedStatistic, setSelectedStatistic] = useState('points');
  const [timeRange, setTimeRange] = useState('season');
  const [comparisonPlayers, setComparisonPlayers] = useState<PlayerType[]>([]);
  const [show3DAnimation, setShow3DAnimation] = useState(false);

  const chartColors = {
    primary: '#3b82f6', // blue
    secondary: '#10b981', // green
    accent: '#8b5cf6', // purple
    highlight: '#f59e0b', // gold
    background: '#333',
    text: '#ffffff'
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const filteredPlayers = squadPlayers.filter(player => 
    player.sport === selectedSport && 
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePlayerPerformanceData = (player: PlayerType | null) => {
    if (!player) return [];
    
    return Array.from({ length: 10 }, (_, i) => {
      const match = i + 1;
      let value = 0;
      
      if (selectedSport === 'football') {
        if (selectedStatistic === 'points') {
          value = 2 + Math.floor(Math.random() * 10);
          if (i % 3 === 0) value += 3;
          if (i % 5 === 0) value += 2;
        } else if (selectedStatistic === 'goals') {
          const max = player.position === 'Forward' ? 3 : player.position === 'Midfielder' ? 2 : 1;
          value = Math.floor(Math.random() * (max + 1));
        } else if (selectedStatistic === 'assists') {
          const max = player.position === 'Midfielder' ? 2 : player.position === 'Forward' ? 1 : 1;
          value = Math.floor(Math.random() * (max + 1));
        } else if (selectedStatistic === 'cleanSheets' && (player.position === 'Defender' || player.position === 'Goalkeeper')) {
          value = Math.random() > 0.6 ? 1 : 0;
        }
      } else if (selectedSport === 'cricket') {
        if (selectedStatistic === 'points') {
          value = 5 + Math.floor(Math.random() * 20);
        } else if (selectedStatistic === 'runs' && (player.position === 'Batsman' || player.position === 'All-rounder')) {
          const max = player.position === 'Batsman' ? 100 : 50;
          value = Math.floor(Math.random() * max);
        } else if (selectedStatistic === 'wickets' && (player.position === 'Bowler' || player.position === 'All-rounder')) {
          value = Math.floor(Math.random() * 6);
        } else if (selectedStatistic === 'dismissals' && player.position === 'Wicketkeeper') {
          value = Math.floor(Math.random() * 5);
        }
      }
      
      return {
        match: `Match ${match}`,
        value
      };
    });
  };

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

  const togglePlayerComparison = (player: PlayerType) => {
    if (comparisonPlayers.some(p => p.id === player.id)) {
      setComparisonPlayers(comparisonPlayers.filter(p => p.id !== player.id));
    } else {
      if (comparisonPlayers.length < 3) {
        setComparisonPlayers([...comparisonPlayers, player]);
      }
    }
  };

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

  useEffect(() => {
    if (comparisonPlayers.length > 0 && view === 'comparison') {
      setShow3DAnimation(true);
    } else {
      setShow3DAnimation(false);
    }
  }, [comparisonPlayers, view]);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
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
                
                <Button 
                  variant="outline" 
                  className={cn(
                    "transition-colors",
                    view === 'comparison' 
                      ? "bg-sportiq-gold text-black hover:bg-sportiq-gold/90" 
                      : "bg-sportiq-gold/10 text-sportiq-gold hover:bg-sportiq-gold/20"
                  )}
                  onClick={() => setView(view === 'performance' ? 'comparison' : 'performance')}
                >
                  {view === 'comparison' ? "Single Player" : "Compare Players"}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
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
                                  <Bar 
                                    dataKey="value" 
                                    name={selectedStatistic.charAt(0).toUpperCase() + selectedStatistic.slice(1)}
                                    fill={chartColors.secondary} 
                                  />
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
                                  <Legend wrapperStyle={{ color: chartColors.text }} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </GlassCard>
                        </div>
                        
                        <GlassCard className="p-4">
                          <h3 className="text-lg font-bold mb-4">
                            {selectedSport === 'football' ? 'Minutes vs Performance' : 'Balls Faced vs Runs'}
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <ScatterChart
                                margin={{
                                  top: 20,
                                  right: 20,
                                  bottom: 20,
                                  left: 20,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis 
                                  type="number" 
                                  dataKey={selectedSport === 'football' ? 'minutes' : 'ballsFaced'} 
                                  name={selectedSport === 'football' ? 'Minutes Played' : 'Balls Faced'} 
                                  stroke={chartColors.text}
                                />
                                <YAxis 
                                  type="number" 
                                  dataKey="value" 
                                  name={selectedSport === 'football' ? 'Performance' : 'Runs'} 
                                  stroke={chartColors.text}
                                />
                                <Tooltip 
                                  cursor={{ strokeDasharray: '3 3' }}
                                  contentStyle={{ 
                                    backgroundColor: chartColors.background, 
                                    color: chartColors.text,
                                    border: `1px solid ${chartColors.highlight}`
                                  }}
                                  formatter={(value, name) => [value, name]}
                                  labelFormatter={(value) => `Match ${value}`}
                                />
                                <Legend wrapperStyle={{ color: chartColors.text }} />
                                <Scatter 
                                  name={selectedSport === 'football' ? 'Performance' : 'Runs'} 
                                  data={generateScatterData(selectedPlayer)} 
                                  fill={chartColors.highlight} 
                                />
                              </ScatterChart>
                            </ResponsiveContainer>
                          </div>
                        </GlassCard>
                        
                        <GlassCard className="p-4">
                          <h3 className="text-lg font-bold mb-4">Form Trend</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={generatePlayerPerformanceData(selectedPlayer)}
                                margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis dataKey="match" stroke={chartColors.text} />
                                <YAxis stroke={chartColors.text} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: chartColors.background, 
                                    color: chartColors.text,
                                    border: `1px solid ${chartColors.accent}`
                                  }}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="value" 
                                  name="Form Rating"
                                  stroke={chartColors.accent} 
                                  fill={`${chartColors.accent}40`} 
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </GlassCard>
                      </>
                    ) : (
                      <GlassCard className="p-4 flex items-center justify-center h-64">
                        <div className="text-center">
                          <User className="h-12 w-12 text-sportiq-blue/50 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">Select a Player</h3>
                          <p className="text-white/70 max-w-md">
                            Choose a player from the list to view detailed performance statistics and visualizations.
                          </p>
                        </div>
                      </GlassCard>
                    )}
                  </>
                ) : (
                  <>
                    {comparisonPlayers.length > 0 ? (
                      <>
                        <GlassCard className="p-4">
                          <h3 className="text-lg font-bold mb-4">Player Comparison: {comparisonPlayers.map(p => p.name).join(' vs ')}</h3>
                          
                          <PlayerComparison3D 
                            players={comparisonPlayers} 
                            sport={selectedSport} 
                            visible={show3DAnimation}
                          />
                          
                          <div className="h-72 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={generateComparisonData()}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                                layout="vertical"
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis type="number" stroke={chartColors.text} />
                                <YAxis dataKey="name" type="category" stroke={chartColors.text} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: chartColors.background, 
                                    color: chartColors.text,
                                    border: `1px solid ${chartColors.primary}`
                                  }}
                                />
                                <Legend wrapperStyle={{ color: chartColors.text }} />
                                {comparisonPlayers.map((player, index) => (
                                  <Bar 
                                    key={player.id} 
                                    dataKey={player.name} 
                                    fill={COLORS[index % COLORS.length]} 
                                  />
                                ))}
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </GlassCard>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <GlassCard className="p-4">
                            <h3 className="text-lg font-bold mb-4">Key Stats Comparison</h3>
                            <div className="space-y-4">
                              {comparisonPlayers.map((player, index) => (
                                <div key={player.id} className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS[index % COLORS.length]}30` }}>
                                    <User className="h-5 w-5" style={{ color: COLORS[index % COLORS.length] }} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <p className="font-medium">{player.name}</p>
                                      <p className="text-sm text-white/70">{player.points} pts</p>
                                    </div>
                                    <div className="w-full bg-sportiq-lightgray/20 h-2 rounded-full mt-1 overflow-hidden">
                                      <div 
                                        className="h-full rounded-full" 
                                        style={{ 
                                          backgroundColor: COLORS[index % COLORS.length],
                                          width: `${(player.points / Math.max(...comparisonPlayers.map(p => p.points))) * 100}%`
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </GlassCard>
                          
                          <GlassCard className="p-4">
                            <h3 className="text-lg font-bold mb-4">Form Comparison</h3>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
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
                                      border: `1px solid ${chartColors.primary}`
                                    }}
                                  />
                                  <Legend wrapperStyle={{ color: chartColors.text }} />
                                  {comparisonPlayers.map((player, index) => (
                                    <Line
                                      key={player.id}
                                      data={generatePlayerPerformanceData(player)}
                                      type="monotone"
                                      dataKey="value"
                                      name={player.name}
                                      stroke={COLORS[index % COLORS.length]}
                                      strokeWidth={2}
                                      activeDot={{ r: 8 }}
                                    />
                                  ))}
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </GlassCard>
                        </div>
                      </>
                    ) : (
                      <GlassCard className="p-4 flex items-center justify-center h-64">
                        <div className="text-center">
                          <User className="h-12 w-12 text-sportiq-gold/50 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">Select Players to Compare</h3>
                          <p className="text-white/70 max-w-md">
                            Choose up to 3 players from the list to compare their performance statistics.
                          </p>
                        </div>
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
