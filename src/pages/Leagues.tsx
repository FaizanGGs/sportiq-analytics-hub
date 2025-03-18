
import React, { useState } from 'react';
import { Trophy, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

// Sample football team data
const footballTeams = [
  { position: 1, name: 'Manchester City', played: 38, won: 28, drawn: 5, lost: 5, goalsFor: 94, goalsAgainst: 33, points: 89, form: 'WWLWW' },
  { position: 2, name: 'Arsenal', played: 38, won: 27, drawn: 6, lost: 5, goalsFor: 88, goalsAgainst: 29, points: 87, form: 'WDWWW' },
  { position: 3, name: 'Liverpool', played: 38, won: 24, drawn: 10, lost: 4, goalsFor: 85, goalsAgainst: 41, points: 82, form: 'WWDWW' },
  { position: 4, name: 'Aston Villa', played: 38, won: 22, drawn: 7, lost: 9, goalsFor: 76, goalsAgainst: 53, points: 73, form: 'LWDWD' },
  { position: 5, name: 'Tottenham', played: 38, won: 20, drawn: 6, lost: 12, goalsFor: 74, goalsAgainst: 61, points: 66, form: 'LDWLW' },
  { position: 6, name: 'Chelsea', played: 38, won: 18, drawn: 11, lost: 9, goalsFor: 77, goalsAgainst: 63, points: 65, form: 'DWWWL' },
  { position: 7, name: 'Newcastle', played: 38, won: 18, drawn: 8, lost: 12, goalsFor: 85, goalsAgainst: 58, points: 62, form: 'WWWLD' },
  { position: 8, name: 'Man United', played: 38, won: 18, drawn: 7, lost: 13, goalsFor: 57, goalsAgainst: 58, points: 61, form: 'WLWWL' },
];

// Sample cricket team data
const cricketTeams = [
  { position: 1, name: 'India', played: 12, won: 10, lost: 2, nrr: 1.76, points: 20, form: 'WWWWL' },
  { position: 2, name: 'Australia', played: 12, won: 9, lost: 3, nrr: 1.47, points: 18, form: 'WWLWW' },
  { position: 3, name: 'England', played: 12, won: 8, lost: 4, nrr: 0.97, points: 16, form: 'WWLWL' },
  { position: 4, name: 'New Zealand', played: 12, won: 7, lost: 5, nrr: 0.57, points: 14, form: 'LWWLW' },
  { position: 5, name: 'South Africa', played: 12, won: 6, lost: 6, nrr: 0.45, points: 12, form: 'WLWLW' },
  { position: 6, name: 'Pakistan', played: 12, won: 5, lost: 7, nrr: -0.13, points: 10, form: 'LWLWL' },
  { position: 7, name: 'West Indies', played: 12, won: 4, lost: 8, nrr: -0.75, points: 8, form: 'LLWLW' },
  { position: 8, name: 'Bangladesh', played: 12, won: 3, lost: 9, nrr: -1.22, points: 6, form: 'LLLWL' },
];

// Form pill component
const FormPill = ({ result }: { result: string }) => {
  return (
    <span className={cn(
      "inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mx-0.5",
      result === 'W' ? "bg-sportiq-green text-black" : 
      result === 'D' ? "bg-sportiq-gold text-black" : 
      "bg-sportiq-red text-white"
    )}>
      {result}
    </span>
  );
};

const Leagues = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter teams based on search query
  const filteredFootballTeams = footballTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCricketTeams = cricketTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-bold text-gradient">Leagues</h1>
              
              <div className="w-full max-w-xs mt-4 sm:mt-0 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input 
                  className="pl-9 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="football" className="w-full">
              <TabsList className="bg-sportiq-lightgray/20 border-b border-sportiq-lightgray/20 w-full justify-start mb-6 pb-0">
                <TabsTrigger value="football" className="data-[state=active]:bg-sportiq-blue data-[state=active]:text-white">
                  Football
                </TabsTrigger>
                <TabsTrigger value="cricket" className="data-[state=active]:bg-sportiq-purple data-[state=active]:text-white">
                  Cricket
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="football">
                <GlassCard>
                  <Table>
                    <TableCaption>Premier League 2023/24 Standings</TableCaption>
                    <TableHeader>
                      <TableRow className="border-b-sportiq-lightgray/30 hover:bg-sportiq-lightgray/5">
                        <TableHead className="text-white w-12 text-center">Pos</TableHead>
                        <TableHead className="text-white">Team</TableHead>
                        <TableHead className="text-white text-center">P</TableHead>
                        <TableHead className="text-white text-center">W</TableHead>
                        <TableHead className="text-white text-center">D</TableHead>
                        <TableHead className="text-white text-center">L</TableHead>
                        <TableHead className="text-white text-center">GF</TableHead>
                        <TableHead className="text-white text-center">GA</TableHead>
                        <TableHead className="text-white text-center">Pts</TableHead>
                        <TableHead className="text-white text-center">Form</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFootballTeams.map((team) => (
                        <TableRow key={team.position} className="border-b-sportiq-lightgray/20 hover:bg-sportiq-lightgray/10">
                          <TableCell className="text-center font-medium">{team.position}</TableCell>
                          <TableCell className="font-medium">{team.name}</TableCell>
                          <TableCell className="text-center">{team.played}</TableCell>
                          <TableCell className="text-center">{team.won}</TableCell>
                          <TableCell className="text-center">{team.drawn}</TableCell>
                          <TableCell className="text-center">{team.lost}</TableCell>
                          <TableCell className="text-center">{team.goalsFor}</TableCell>
                          <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                          <TableCell className="text-center font-semibold">{team.points}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              {team.form.split('').map((result, idx) => (
                                <FormPill key={idx} result={result} />
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="cricket">
                <GlassCard>
                  <Table>
                    <TableCaption>Cricket World Cup Standings</TableCaption>
                    <TableHeader>
                      <TableRow className="border-b-sportiq-lightgray/30 hover:bg-sportiq-lightgray/5">
                        <TableHead className="text-white w-12 text-center">Pos</TableHead>
                        <TableHead className="text-white">Team</TableHead>
                        <TableHead className="text-white text-center">P</TableHead>
                        <TableHead className="text-white text-center">W</TableHead>
                        <TableHead className="text-white text-center">L</TableHead>
                        <TableHead className="text-white text-center">NRR</TableHead>
                        <TableHead className="text-white text-center">Pts</TableHead>
                        <TableHead className="text-white text-center">Form</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCricketTeams.map((team) => (
                        <TableRow key={team.position} className="border-b-sportiq-lightgray/20 hover:bg-sportiq-lightgray/10">
                          <TableCell className="text-center font-medium">{team.position}</TableCell>
                          <TableCell className="font-medium">{team.name}</TableCell>
                          <TableCell className="text-center">{team.played}</TableCell>
                          <TableCell className="text-center">{team.won}</TableCell>
                          <TableCell className="text-center">{team.lost}</TableCell>
                          <TableCell className="text-center">{team.nrr.toFixed(2)}</TableCell>
                          <TableCell className="text-center font-semibold">{team.points}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              {team.form.split('').map((result, idx) => (
                                <FormPill key={idx} result={result} />
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leagues;
