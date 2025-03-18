
import React, { useState } from 'react';
import { Calendar, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfWeek, isToday, isFuture } from 'date-fns';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample match data
const footballMatches = [
  { id: 1, date: new Date(2023, 5, 1, 15, 0), competition: 'Premier League', homeTeam: 'Manchester City', awayTeam: 'Liverpool', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.87 },
  { id: 2, date: new Date(2023, 5, 1, 17, 30), competition: 'La Liga', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.82 },
  { id: 3, date: new Date(2023, 4, 30, 20, 0), competition: 'Premier League', homeTeam: 'Arsenal', awayTeam: 'Manchester United', homeScore: 2, awayScore: 1, status: 'completed', predictionAccuracy: 0.91 },
  { id: 4, date: new Date(2023, 4, 30, 15, 0), competition: 'Bundesliga', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeScore: 3, awayScore: 2, status: 'completed', predictionAccuracy: 0.76 },
  { id: 5, date: new Date(2023, 4, 29, 20, 45), competition: 'Serie A', homeTeam: 'AC Milan', awayTeam: 'Juventus', homeScore: 1, awayScore: 1, status: 'completed', predictionAccuracy: 0.65 },
  { id: 6, date: new Date(2023, 5, 2, 18, 0), competition: 'Ligue 1', homeTeam: 'PSG', awayTeam: 'Marseille', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.77 },
  { id: 7, date: new Date(2023, 5, 2, 20, 30), competition: 'Premier League', homeTeam: 'Chelsea', awayTeam: 'Tottenham', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.72 },
  { id: 8, date: new Date(2023, 5, 3, 15, 0), competition: 'La Liga', homeTeam: 'Atletico Madrid', awayTeam: 'Sevilla', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.69 },
];

const cricketMatches = [
  { id: 1, date: new Date(2023, 5, 1, 10, 0), competition: 'T20 World Cup', homeTeam: 'India', awayTeam: 'Pakistan', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.85 },
  { id: 2, date: new Date(2023, 5, 1, 14, 0), competition: 'ODI Series', homeTeam: 'Australia', awayTeam: 'England', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.79 },
  { id: 3, date: new Date(2023, 4, 30, 9, 30), competition: 'T20 World Cup', homeTeam: 'New Zealand', awayTeam: 'South Africa', homeScore: '189/6', awayScore: '176/8', status: 'completed', predictionAccuracy: 0.88 },
  { id: 4, date: new Date(2023, 4, 30, 14, 0), competition: 'Test Series', homeTeam: 'West Indies', awayTeam: 'Bangladesh', homeScore: '321/5', awayScore: '203/8', status: 'completed', predictionAccuracy: 0.73 },
  { id: 5, date: new Date(2023, 4, 29, 10, 0), competition: 'T20 World Cup', homeTeam: 'Afghanistan', awayTeam: 'Sri Lanka', homeScore: '156/8', awayScore: '157/4', status: 'completed', predictionAccuracy: 0.67 },
  { id: 6, date: new Date(2023, 5, 2, 9, 30), competition: 'ODI Series', homeTeam: 'Pakistan', awayTeam: 'West Indies', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.76 },
  { id: 7, date: new Date(2023, 5, 2, 14, 0), competition: 'T20 World Cup', homeTeam: 'England', awayTeam: 'Australia', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.81 },
  { id: 8, date: new Date(2023, 5, 3, 9, 30), competition: 'Test Series', homeTeam: 'India', awayTeam: 'New Zealand', homeScore: null, awayScore: null, status: 'upcoming', predictionAccuracy: 0.84 },
];

const Schedules = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSport, setSelectedSport] = useState('football');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('all');
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  // Create array of 7 days starting from currentWeekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  // Get unique competitions
  const competitions = selectedSport === 'football'
    ? [...new Set(footballMatches.map(match => match.competition))]
    : [...new Set(cricketMatches.map(match => match.competition))];
  
  // Filter matches based on search, sport, competition, and date range
  const filteredMatches = (selectedSport === 'football' ? footballMatches : cricketMatches)
    .filter(match => 
      (match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
       match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCompetition === 'all' || match.competition === selectedCompetition) &&
      (match.date >= currentWeekStart && match.date < addDays(currentWeekStart, 7))
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Navigate weeks
  const previousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen sm:pl-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h1 className="text-2xl font-bold text-gradient">Match Schedules</h1>
              
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
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
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-1/3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input 
                  className="pl-9 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full sm:w-1/3">
                <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                  <SelectTrigger className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                    <SelectValue placeholder="Select Competition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Competitions</SelectItem>
                    {competitions.map(competition => (
                      <SelectItem key={competition} value={competition}>{competition}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Week navigation */}
            <GlassCard className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="icon" onClick={previousWeek}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-medium">
                  {format(currentWeekStart, 'd MMM')} - {format(addDays(currentWeekStart, 6), 'd MMM yyyy')}
                </h2>
                <Button variant="ghost" size="icon" onClick={nextWeek}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "text-center py-2 rounded-md",
                      isToday(day) && "bg-sportiq-blue/20 font-bold",
                      isFuture(day) && "text-white/80"
                    )}
                  >
                    <div className="text-xs text-white/60">{format(day, 'EEE')}</div>
                    <div className="text-lg">{format(day, 'd')}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            {/* Match list */}
            <div className="space-y-4">
              {filteredMatches.length > 0 ? (
                filteredMatches.map(match => (
                  <GlassCard 
                    key={match.id} 
                    className={cn(
                      "p-4",
                      match.status === 'completed' ? "border-l-4 border-sportiq-green" : "border-l-4 border-sportiq-gold"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-white/70" />
                        <span className="text-sm text-white/70">{format(match.date, 'dd MMM yyyy, HH:mm')}</span>
                      </div>
                      <span className="text-sm px-2 py-0.5 rounded-full bg-sportiq-lightgray/30 mt-2 sm:mt-0">
                        {match.competition}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                      <div className="flex-1 text-center sm:text-right">
                        <h3 className="text-lg font-bold">{match.homeTeam}</h3>
                        {match.status === 'completed' && (
                          <p className="text-2xl font-bold text-white">{match.homeScore}</p>
                        )}
                      </div>
                      
                      <div className="text-center px-4">
                        <span className="text-lg font-bold">vs</span>
                        {match.status === 'completed' ? (
                          <div className="text-xs text-white/70 mt-1">Completed</div>
                        ) : (
                          <div className="text-xs text-sportiq-gold mt-1">Upcoming</div>
                        )}
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold">{match.awayTeam}</h3>
                        {match.status === 'completed' && (
                          <p className="text-2xl font-bold text-white">{match.awayScore}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-sportiq-lightgray/20 flex justify-between items-center">
                      <div className="text-sm text-white/70">
                        {match.status === 'completed' ? 'Match Result' : 'Match Prediction'}
                      </div>
                      <div className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        match.predictionAccuracy >= 0.8 
                          ? "bg-sportiq-green/20 text-sportiq-green"
                          : match.predictionAccuracy >= 0.7
                            ? "bg-sportiq-gold/20 text-sportiq-gold"
                            : "bg-sportiq-red/20 text-sportiq-red"
                      )}>
                        {(match.predictionAccuracy * 100).toFixed(0)}% Accurate
                      </div>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard className="p-8 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-16 w-16 text-sportiq-lightgray/50 mb-4" />
                  <h2 className="text-xl font-semibold">No Matches Found</h2>
                  <p className="text-white/70 mt-2">
                    Try adjusting your filters or search terms to find matches
                  </p>
                </GlassCard>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Schedules;
