
import React, { useState } from 'react';
import { LineChart, BarChart, PieChart, ScatterChart, AreaChart, ArrowRight, Search, User, UserPlus } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  ScatterChart as RechartsScatterChart,
  Scatter,
  ZAxis,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Sample data for charts
const playerPerformanceData = [
  { name: 'Jan', runs: 65, wickets: 4, average: 32.5 },
  { name: 'Feb', runs: 80, wickets: 2, average: 40 },
  { name: 'Mar', runs: 45, wickets: 5, average: 22.5 },
  { name: 'Apr', runs: 120, wickets: 3, average: 60 },
  { name: 'May', runs: 75, wickets: 6, average: 37.5 },
  { name: 'Jun', runs: 95, wickets: 4, average: 47.5 },
];

const playerComparisonData = [
  { name: 'Babar', x: 90, y: 85, z: 150 },
  { name: 'Kohli', x: 92, y: 82, z: 170 },
  { name: 'Root', x: 85, y: 90, z: 140 },
  { name: 'Smith', x: 88, y: 87, z: 160 },
  { name: 'Kane', x: 83, y: 89, z: 130 },
];

const playerStatsData = [
  { name: 'Runs', value: 720 },
  { name: 'Avg', value: 40 },
  { name: 'SR', value: 145 },
  { name: 'Wickets', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Sample players for selection
const availablePlayers = [
  { id: 1, name: 'Virat Kohli', team: 'India', sport: 'cricket' },
  { id: 2, name: 'Joe Root', team: 'England', sport: 'cricket' },
  { id: 3, name: 'Steven Smith', team: 'Australia', sport: 'cricket' },
  { id: 4, name: 'Kane Williamson', team: 'New Zealand', sport: 'cricket' },
  { id: 5, name: 'Babar Azam', team: 'Pakistan', sport: 'cricket' },
  { id: 6, name: 'Lionel Messi', team: 'Inter Miami', sport: 'football' },
  { id: 7, name: 'Cristiano Ronaldo', team: 'Al-Nassr', sport: 'football' },
  { id: 8, name: 'Kevin De Bruyne', team: 'Man City', sport: 'football' },
  { id: 9, name: 'Erling Haaland', team: 'Man City', sport: 'football' },
  { id: 10, name: 'Kylian Mbappé', team: 'Real Madrid', sport: 'football' },
];

// Sample skill data for radar chart
const skillData = [
  { subject: 'Batting', A: 120, B: 110, fullMark: 150 },
  { subject: 'Bowling', A: 98, B: 130, fullMark: 150 },
  { subject: 'Fielding', A: 86, B: 130, fullMark: 150 },
  { subject: 'Running', A: 99, B: 100, fullMark: 150 },
  { subject: 'Fitness', A: 85, B: 90, fullMark: 150 },
  { subject: 'Consistency', A: 65, B: 85, fullMark: 150 },
];

const Performance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChart, setActiveChart] = useState('performance');
  const [activeSport, setActiveSport] = useState('cricket');
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);

  // Filter players by sport and search query
  const filteredPlayers = availablePlayers.filter(player => 
    player.sport === activeSport && 
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the currently selected player object
  const currentPlayer = selectedPlayer 
    ? availablePlayers.find(p => p.id === selectedPlayer) 
    : null;

  // Common tooltip style with white text
  const tooltipStyle = { 
    backgroundColor: '#1e1e2f', 
    border: 'none', 
    borderRadius: '8px',
    color: '#ffffff' 
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-2xl font-bold text-gradient">Performance Analytics</h1>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="flex rounded-md overflow-hidden">
                  <Button 
                    variant={activeSport === 'cricket' ? "default" : "outline"}
                    className={activeSport === 'cricket' ? "bg-sportiq-purple hover:bg-sportiq-purple/90" : "bg-sportiq-purple/10 text-sportiq-purple hover:bg-sportiq-purple/20"}
                    onClick={() => setActiveSport('cricket')}
                  >
                    Cricket
                  </Button>
                  <Button 
                    variant={activeSport === 'football' ? "default" : "outline"}
                    className={activeSport === 'football' ? "bg-sportiq-blue hover:bg-sportiq-blue/90" : "bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"}
                    onClick={() => setActiveSport('football')}
                  >
                    Football
                  </Button>
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline"
                    className="bg-sportiq-green/10 text-sportiq-green hover:bg-sportiq-green/20 w-full sm:w-auto"
                    onClick={() => setShowPlayerSelector(!showPlayerSelector)}
                  >
                    {currentPlayer ? currentPlayer.name : 'Select Player'} 
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {showPlayerSelector && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-sportiq-black border border-sportiq-lightgray/30 rounded-lg shadow-lg z-10 overflow-hidden">
                      <div className="p-2">
                        <div className="relative mb-2">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          <Input 
                            className="pl-8 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                            placeholder="Search players..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {filteredPlayers.map(player => (
                            <div 
                              key={player.id} 
                              className={cn(
                                "flex items-center gap-2 p-2 cursor-pointer hover:bg-sportiq-lightgray/20 rounded transition-colors",
                                selectedPlayer === player.id ? "bg-sportiq-lightgray/30" : ""
                              )}
                              onClick={() => {
                                setSelectedPlayer(player.id);
                                setShowPlayerSelector(false);
                              }}
                            >
                              <div className="h-8 w-8 rounded-full bg-sportiq-purple/20 flex items-center justify-center">
                                <User className="h-4 w-4 text-sportiq-purple" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{player.name}</p>
                                <p className="text-xs text-white/70">{player.team}</p>
                              </div>
                            </div>
                          ))}
                          {filteredPlayers.length === 0 && (
                            <p className="text-center text-sm text-white/50 py-4">No players found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Player Stats Overview (visible when player is selected) */}
            {currentPlayer && (
              <GlassCard className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-sportiq-purple/20 flex items-center justify-center">
                    <User className="h-8 w-8 text-sportiq-purple" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentPlayer.name}</h2>
                    <p className="text-white/70">{currentPlayer.team} • {currentPlayer.sport}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/70">Season Points</p>
                    <p className="text-xl font-bold text-sportiq-green">857</p>
                  </div>
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/70">Form</p>
                    <p className="text-xl font-bold text-sportiq-blue">8.5</p>
                  </div>
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/70">{activeSport === 'cricket' ? 'Runs' : 'Goals'}</p>
                    <p className="text-xl font-bold text-sportiq-gold">720</p>
                  </div>
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/70">{activeSport === 'cricket' ? 'Wickets' : 'Assists'}</p>
                    <p className="text-xl font-bold text-sportiq-purple">25</p>
                  </div>
                </div>
                
                {/* Player Skill Radar Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                      <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} />
                      <Radar name={currentPlayer.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="League Avg" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip contentStyle={tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            )}
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Button 
                variant={activeChart === 'performance' ? "default" : "outline"}
                className={activeChart === 'performance' ? "bg-sportiq-blue hover:bg-sportiq-blue/90" : "bg-sportiq-blue/10 text-sportiq-blue hover:bg-sportiq-blue/20"}
                onClick={() => setActiveChart('performance')}
              >
                Performance Trends
              </Button>
              <Button 
                variant={activeChart === 'comparison' ? "default" : "outline"}
                className={activeChart === 'comparison' ? "bg-sportiq-purple hover:bg-sportiq-purple/90" : "bg-sportiq-purple/10 text-sportiq-purple hover:bg-sportiq-purple/20"}
                onClick={() => setActiveChart('comparison')}
              >
                Player Comparison
              </Button>
              <Button 
                variant={activeChart === 'stats' ? "default" : "outline"}
                className={activeChart === 'stats' ? "bg-sportiq-green hover:bg-sportiq-green/90" : "bg-sportiq-green/10 text-sportiq-green hover:bg-sportiq-green/20"}
                onClick={() => setActiveChart('stats')}
              >
                Key Stats
              </Button>
              <Button 
                variant={activeChart === 'form' ? "default" : "outline"}
                className={activeChart === 'form' ? "bg-sportiq-gold hover:bg-sportiq-gold/90" : "bg-sportiq-gold/10 text-sportiq-gold hover:bg-sportiq-gold/20"}
                onClick={() => setActiveChart('form')}
              >
                Form Analysis
              </Button>
            </div>
            
            {activeChart === 'performance' && (
              <GlassCard className="p-6">
                <div className="flex items-center mb-4">
                  <LineChart className="h-6 w-6 text-sportiq-blue mr-2" />
                  <h2 className="text-xl font-semibold">Performance Trends</h2>
                </div>
                <p className="text-white/70 mb-6">Six-month performance breakdown showing runs, wickets, and batting average</p>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={playerPerformanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                      <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ color: "#ffffff" }} />
                      <Line type="monotone" dataKey="runs" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="wickets" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            )}
            
            {activeChart === 'comparison' && (
              <GlassCard className="p-6">
                <div className="flex items-center mb-4">
                  <ScatterChart className="h-6 w-6 text-sportiq-purple mr-2" />
                  <h2 className="text-xl font-semibold">Player Comparison</h2>
                </div>
                <p className="text-white/70 mb-6">Compare player metrics across technique (x), consistency (y), and impact (size)</p>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis type="number" dataKey="x" name="Technique" unit="%" stroke="rgba(255, 255, 255, 0.7)" domain={[80, 95]} />
                      <YAxis type="number" dataKey="y" name="Consistency" unit="%" stroke="rgba(255, 255, 255, 0.7)" domain={[80, 95]} />
                      <ZAxis type="number" dataKey="z" range={[60, 200]} name="Impact" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ color: "#ffffff" }} />
                      <Scatter name="Players" data={playerComparisonData} fill="#8884d8" />
                    </RechartsScatterChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            )}
            
            {activeChart === 'stats' && (
              <GlassCard className="p-6">
                <div className="flex items-center mb-4">
                  <PieChart className="h-6 w-6 text-sportiq-green mr-2" />
                  <h2 className="text-xl font-semibold">Key Stats</h2>
                </div>
                <p className="text-white/70 mb-6">Key performance indicators broken down by relative importance</p>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={playerStatsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {playerStatsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ color: "#ffffff" }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            )}
            
            {activeChart === 'form' && (
              <GlassCard className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-sportiq-gold mr-2" />
                  <h2 className="text-xl font-semibold">Form Analysis</h2>
                </div>
                <p className="text-white/70 mb-6">Month-by-month performance breakdown with multi-metric analysis</p>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={playerPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                      <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ color: "#ffffff" }} />
                      <Bar dataKey="runs" fill="#f59e0b" />
                      <Bar dataKey="wickets" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <div className="flex items-center mb-4">
                  <AreaChart className="h-6 w-6 text-sportiq-blue mr-2" />
                  <h2 className="text-lg font-semibold">Player Form Tracker</h2>
                </div>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart
                      data={playerPerformanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                      <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="runs" stackId="1" stroke="#8884d8" fill="url(#colorRuns)" />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BarChart className="h-6 w-6 text-sportiq-purple mr-2" />
                    <h2 className="text-lg font-semibold">Performance Insights</h2>
                  </div>
                  <Button variant="link" className="text-sportiq-green flex items-center">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                    <p className="text-sm">Batting average has improved by 32% compared to previous year</p>
                  </div>
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                    <p className="text-sm">Peak performance observed during April with highest run rate</p>
                  </div>
                  <div className="bg-sportiq-lightgray/10 p-3 rounded-lg">
                    <p className="text-sm">Strike rate remains consistently above team average</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
