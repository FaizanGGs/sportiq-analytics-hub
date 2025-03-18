
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PieChart, LineChart } from 'lucide-react';
import { Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for charts
const footballPerformanceData = [
  { name: 'Week 1', goals: 12, assists: 8, points: 46 },
  { name: 'Week 2', goals: 19, assists: 15, points: 74 },
  { name: 'Week 3', goals: 8, assists: 12, points: 52 },
  { name: 'Week 4', goals: 15, assists: 10, points: 65 },
  { name: 'Week 5', goals: 22, assists: 18, points: 98 },
  { name: 'Week 6', goals: 18, assists: 14, points: 82 },
  { name: 'Week 7', goals: 16, assists: 11, points: 71 },
];

const cricketPerformanceData = [
  { name: 'Week 1', runs: 245, wickets: 12, points: 76 },
  { name: 'Week 2', runs: 310, wickets: 15, points: 92 },
  { name: 'Week 3', runs: 180, wickets: 8, points: 58 },
  { name: 'Week 4', runs: 290, wickets: 18, points: 88 },
  { name: 'Week 5', runs: 320, wickets: 22, points: 104 },
  { name: 'Week 6', runs: 270, wickets: 14, points: 81 },
  { name: 'Week 7', runs: 230, wickets: 16, points: 78 },
];

const predictionAccuracyData = [
  { name: 'Match Results', value: 78 },
  { name: 'Player Performance', value: 65 },
  { name: 'Team Stats', value: 82 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/performance" className="block">
                <GlassCard className="p-4 flex flex-col items-center justify-center h-full hover:bg-sportiq-lightgray/10 transition-colors">
                  <BarChart3 className="h-16 w-16 text-sportiq-blue mb-4" />
                  <h2 className="text-lg font-semibold">Team Statistics</h2>
                  <p className="text-white/70 mt-2 text-center">Advanced team performance metrics and comparisons</p>
                  <Button className="mt-4 bg-sportiq-blue hover:bg-sportiq-blue/90">View Report</Button>
                </GlassCard>
              </Link>
              
              <Link to="/performance" className="block">
                <GlassCard className="p-4 flex flex-col items-center justify-center h-full hover:bg-sportiq-lightgray/10 transition-colors">
                  <PieChart className="h-16 w-16 text-sportiq-purple mb-4" />
                  <h2 className="text-lg font-semibold">Player Analysis</h2>
                  <p className="text-white/70 mt-2 text-center">In-depth player performance and contribution statistics</p>
                  <Button className="mt-4 bg-sportiq-purple hover:bg-sportiq-purple/90">View Players</Button>
                </GlassCard>
              </Link>
              
              <Link to="/predictions" className="block">
                <GlassCard className="p-4 flex flex-col items-center justify-center h-full hover:bg-sportiq-lightgray/10 transition-colors">
                  <LineChart className="h-16 w-16 text-sportiq-green mb-4" />
                  <h2 className="text-lg font-semibold">Trend Analysis</h2>
                  <p className="text-white/70 mt-2 text-center">Long-term performance trends and pattern recognition</p>
                  <Button className="mt-4 bg-sportiq-green hover:bg-sportiq-green/90">View Trends</Button>
                </GlassCard>
              </Link>
            </div>
            
            <Tabs defaultValue="football" className="w-full">
              <TabsList className="bg-sportiq-lightgray/20 border-b border-sportiq-lightgray/20 w-full justify-start mb-6 pb-0">
                <TabsTrigger value="football" className="data-[state=active]:bg-sportiq-blue data-[state=active]:text-white">
                  Football Analytics
                </TabsTrigger>
                <TabsTrigger value="cricket" className="data-[state=active]:bg-sportiq-purple data-[state=active]:text-white">
                  Cricket Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="football">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-bold mb-4">Performance Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={footballPerformanceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                          <XAxis dataKey="name" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #3b82f6' }} />
                          <Legend wrapperStyle={{ color: '#fff' }} />
                          <Line type="monotone" dataKey="points" stroke="#3b82f6" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="goals" stroke="#10b981" />
                          <Line type="monotone" dataKey="assists" stroke="#f59e0b" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-bold mb-4">Prediction Accuracy</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={predictionAccuracyData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {predictionAccuracyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #8b5cf6' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
                
                <GlassCard className="p-4 mt-6">
                  <h3 className="text-lg font-bold mb-4">Weekly Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={footballPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #10b981' }} />
                        <Legend wrapperStyle={{ color: '#fff' }} />
                        <Bar dataKey="goals" fill="#10b981" />
                        <Bar dataKey="assists" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="cricket">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-bold mb-4">Performance Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={cricketPerformanceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                          <XAxis dataKey="name" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #8b5cf6' }} />
                          <Legend wrapperStyle={{ color: '#fff' }} />
                          <Line type="monotone" dataKey="points" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="runs" stroke="#f59e0b" />
                          <Line type="monotone" dataKey="wickets" stroke="#10b981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-bold mb-4">Prediction Accuracy</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={predictionAccuracyData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {predictionAccuracyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #8b5cf6' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
                
                <GlassCard className="p-4 mt-6">
                  <h3 className="text-lg font-bold mb-4">Weekly Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cricketPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: '1px solid #f59e0b' }} />
                        <Legend wrapperStyle={{ color: '#fff' }} />
                        <Bar dataKey="runs" fill="#f59e0b" />
                        <Bar dataKey="wickets" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
