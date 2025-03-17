
import React, { useState } from 'react';
import { LineChart, BarChart, PieChart, ScatterChart, AreaChart, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
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
  Cell
} from 'recharts';

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

const Performance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChart, setActiveChart] = useState('performance');

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">Performance Analytics</h1>
            
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
                      <Tooltip contentStyle={{ backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px' }} />
                      <Legend />
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
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px' }} />
                      <Legend />
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
                      <Tooltip contentStyle={{ backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px' }} />
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
                      <Tooltip contentStyle={{ backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px' }} />
                      <Legend />
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
                      <Tooltip contentStyle={{ backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px' }} />
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
