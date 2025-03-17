
import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { teams } from '@/data/sampleData';

const Teams = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.league.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gradient">Teams</h1>
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sportiq-lightgray" />
                <Input 
                  type="text" 
                  placeholder="Search teams..." 
                  className="pl-8 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeams.map((team) => (
                <GlassCard key={team.id} className="p-4 hover:bg-sportiq-lightgray/20 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-sportiq-blue to-sportiq-purple">
                      <span className="text-lg font-bold">{team.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">{team.name}</h2>
                      <p className="text-sm text-white/70">{team.league}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 text-center">
                    <div>
                      <p className="text-xs text-white/70">Position</p>
                      <p className="font-semibold">{team.position}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Form</p>
                      <p className="font-semibold">{team.form}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Rating</p>
                      <p className="font-semibold">{team.rating}/10</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between text-xs">
                    <div className={`px-2 py-1 rounded-full ${team.lastResult === 'Win' ? 'bg-sportiq-green/20 text-sportiq-green' : team.lastResult === 'Draw' ? 'bg-sportiq-gold/20 text-sportiq-gold' : 'bg-sportiq-red/20 text-sportiq-red'}`}>
                      Last: {team.lastResult}
                    </div>
                    <div className="text-sportiq-blue">
                      {team.squadSize} players
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
