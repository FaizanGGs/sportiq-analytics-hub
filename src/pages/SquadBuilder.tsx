import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Filter, Search, Save, Download, ChevronRight } from 'lucide-react';
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
import { PlayerType, PositionSlot, FormationTemplate, BudgetInfo, TeamAnalytics } from '@/types/player';
import PositionSlotComponent from '@/components/squad-builder/PositionSlot';
import PlayerSelection from '@/components/squad-builder/PlayerSelection';
import PerformanceMetrics from '@/components/squad-builder/PerformanceMetrics';
import TeamAnalyticsComponent from '@/components/squad-builder/TeamAnalytics';
import BudgetManager from '@/components/squad-builder/BudgetManager';

// Add more cricket players to allow filling all positions
const additionalCricketPlayers: PlayerType[] = [
  { id: 1001, name: 'Virat Kohli', position: 'Batsman', team: 'India', price: 14.5, form: 'Good', points: 87, selected: false, sport: 'cricket', stats: { runs: 567, strikeRate: 143, avg: 56.7, centuries: 2 } },
  { id: 1002, name: 'Rohit Sharma', position: 'Batsman', team: 'India', price: 13.8, form: 'Excellent', points: 92, selected: false, sport: 'cricket', stats: { runs: 621, strikeRate: 152, avg: 62.1, centuries: 3 } },
  { id: 1003, name: 'Joe Root', position: 'Batsman', team: 'England', price: 12.5, form: 'Good', points: 83, selected: false, sport: 'cricket', stats: { runs: 498, strikeRate: 124, avg: 49.8, centuries: 1 } },
  { id: 1004, name: 'Kane Williamson', position: 'Batsman', team: 'New Zealand', price: 13.2, form: 'Moderate', points: 79, selected: false, sport: 'cricket', stats: { runs: 432, strikeRate: 118, avg: 48.0, centuries: 1 } },
  { id: 1005, name: 'Steve Smith', position: 'Batsman', team: 'Australia', price: 13.5, form: 'Good', points: 84, selected: false, sport: 'cricket', stats: { runs: 512, strikeRate: 127, avg: 51.2, centuries: 2 } },
  { id: 1006, name: 'Ben Stokes', position: 'All-rounder', team: 'England', price: 14.0, form: 'Excellent', points: 91, selected: false, sport: 'cricket', stats: { runs: 378, wickets: 16, strikeRate: 138, economy: 7.2 } },
  { id: 1007, name: 'Hardik Pandya', position: 'All-rounder', team: 'India', price: 12.6, form: 'Good', points: 86, selected: false, sport: 'cricket', stats: { runs: 312, wickets: 18, strikeRate: 145, economy: 8.3 } },
  { id: 1008, name: 'Ravindra Jadeja', position: 'All-rounder', team: 'India', price: 11.8, form: 'Moderate', points: 79, selected: false, sport: 'cricket', stats: { runs: 267, wickets: 21, strikeRate: 132, economy: 6.9 } },
  { id: 1009, name: 'Pat Cummins', position: 'Bowler', team: 'Australia', price: 12.2, form: 'Good', points: 85, selected: false, sport: 'cricket', stats: { wickets: 24, economy: 6.4, bowling_avg: 18.7, bestBowling: '4/23' } },
  { id: 1010, name: 'Jasprit Bumrah', position: 'Bowler', team: 'India', price: 13.6, form: 'Excellent', points: 90, selected: false, sport: 'cricket', stats: { wickets: 28, economy: 5.8, bowling_avg: 16.2, bestBowling: '5/17' } },
  { id: 1011, name: 'Kagiso Rabada', position: 'Bowler', team: 'South Africa', price: 12.0, form: 'Good', points: 82, selected: false, sport: 'cricket', stats: { wickets: 23, economy: 7.1, bowling_avg: 19.4, bestBowling: '4/31' } },
  { id: 1012, name: 'Trent Boult', position: 'Bowler', team: 'New Zealand', price: 11.5, form: 'Moderate', points: 78, selected: false, sport: 'cricket', stats: { wickets: 20, economy: 7.4, bowling_avg: 20.1, bestBowling: '3/25' } },
  { id: 1013, name: 'Rashid Khan', position: 'Bowler', team: 'Afghanistan', price: 12.8, form: 'Good', points: 87, selected: false, sport: 'cricket', stats: { wickets: 26, economy: 6.2, bowling_avg: 17.5, bestBowling: '4/19' } },
  { id: 1014, name: 'Jos Buttler', position: 'Wicketkeeper', team: 'England', price: 13.4, form: 'Excellent', points: 89, selected: false, sport: 'cricket', stats: { runs: 423, dismissals: 18, strikeRate: 151, avg: 42.3 } },
  { id: 1015, name: 'Quinton de Kock', position: 'Wicketkeeper', team: 'South Africa', price: 12.3, form: 'Good', points: 83, selected: false, sport: 'cricket', stats: { runs: 387, dismissals: 15, strikeRate: 142, avg: 38.7 } },
];

const allCricketPlayers = [...squadPlayers.filter(p => p.sport === 'cricket'), ...additionalCricketPlayers];

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
  
  // Budget state
  const [budget, setBudget] = useState<BudgetInfo>({
    total: 100,
    spent: 0,
    remaining: 100
  });

  // Team analytics state
  const [teamAnalytics, setTeamAnalytics] = useState<TeamAnalytics>({
    overallRating: 0,
    attackRating: 0,
    midfieldRating: 0,
    defenseRating: 0,
    formRating: 0,
    chemistry: 0,
    strengths: [],
    weaknesses: [],
    suggestions: []
  });

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

  // Update budget and analytics whenever the squad changes
  useEffect(() => {
    updateBudgetAndAnalytics();
  }, [positionSlots]);

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
    
    // Reset budget
    setBudget(prev => ({
      ...prev,
      spent: 0,
      remaining: prev.total
    }));
  };

  const handleSelectPosition = (slotId: string) => {
    const slot = positionSlots.find(slot => slot.id === slotId);
    if (slot) {
      setSelectedPosition(slot.type);
      setSelectedPositionSlot(slotId);
      setSelectedPlayer(slot.player);
    }
  };

  const updateBudgetAndAnalytics = () => {
    // Update budget
    const filledSlots = positionSlots.filter(slot => slot.filled && slot.player);
    const totalSpent = filledSlots.reduce((sum, slot) => sum + (slot.player?.price || 0), 0);
    
    setBudget(prev => ({
      ...prev,
      spent: totalSpent,
      remaining: prev.total - totalSpent
    }));
    
    // Update analytics
    if (filledSlots.length > 0) {
      const footballAnalytics = computeFootballAnalytics(filledSlots.map(slot => slot.player as PlayerType));
      const cricketAnalytics = computeCricketAnalytics(filledSlots.map(slot => slot.player as PlayerType));
      
      setTeamAnalytics(activeTab === 'football' ? footballAnalytics : cricketAnalytics);
    } else {
      // Reset analytics when no players are selected
      setTeamAnalytics({
        overallRating: 0,
        attackRating: 0,
        midfieldRating: 0,
        defenseRating: 0,
        formRating: 0,
        chemistry: 0,
        strengths: [],
        weaknesses: [],
        suggestions: []
      });
    }
  };

  const computeFootballAnalytics = (players: PlayerType[]): TeamAnalytics => {
    if (players.length === 0) {
      return {
        overallRating: 0,
        attackRating: 0,
        midfieldRating: 0,
        defenseRating: 0,
        formRating: 0, 
        chemistry: 0,
        strengths: [],
        weaknesses: [],
        suggestions: []
      };
    }
    
    // Calculate ratings
    const forwards = players.filter(p => p.position === 'Forward');
    const midfielders = players.filter(p => p.position === 'Midfielder');  
    const defenders = players.filter(p => p.position === 'Defender');
    const goalkeeper = players.filter(p => p.position === 'Goalkeeper');
    
    const attackRating = forwards.length > 0 
      ? forwards.reduce((sum, p) => sum + p.points, 0) / (forwards.length * 10) * 10
      : 0;
      
    const midfieldRating = midfielders.length > 0
      ? midfielders.reduce((sum, p) => sum + p.points, 0) / (midfielders.length * 10) * 10
      : 0;
      
    const defenseRating = defenders.length > 0 && goalkeeper.length > 0
      ? [...defenders, ...goalkeeper].reduce((sum, p) => sum + p.points, 0) / ((defenders.length + goalkeeper.length) * 10) * 10
      : 0;
    
    const formScore = players.reduce((sum, p) => {
      if (p.form === 'Excellent') return sum + 10;
      if (p.form === 'Good') return sum + 8;
      if (p.form === 'Moderate') return sum + 6;
      if (p.form === 'Poor') return sum + 4;
      return sum + 5;
    }, 0);
    
    const formRating = formScore / players.length;
    const overallRating = (attackRating + midfieldRating + defenseRating + formRating) / 4;

    // Team chemistry - based on having players from same teams
    const teamCounts: Record<string, number> = {};
    players.forEach(p => {
      teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
    });
    
    const chemistry = Object.values(teamCounts).reduce((sum, count) => {
      if (count >= 3) return sum + 3; // Bonus for having 3+ players from same team
      if (count === 2) return sum + 1;
      return sum;
    }, 0) / (players.length / 2) * 10;
    
    // Identify strengths and weaknesses
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    
    if (attackRating >= 8) strengths.push("Strong attack with high-scoring forwards");
    if (attackRating < 6) weaknesses.push("Attack could use improvement");
    
    if (midfieldRating >= 8) strengths.push("Excellent midfield control");
    if (midfieldRating < 6) weaknesses.push("Midfield lacks creativity and control");
    
    if (defenseRating >= 8) strengths.push("Solid defensive organization");
    if (defenseRating < 6) weaknesses.push("Defense is vulnerable to conceding");
    
    if (formRating >= 8) strengths.push("Team is in excellent form");
    if (formRating < 6) weaknesses.push("Several players are out of form");
    
    if (chemistry >= 7) strengths.push("Great team chemistry");
    if (chemistry < 5) suggestions.push("Consider adding more players from the same team to improve chemistry");
    
    // Balance suggestions
    const idealRatio = {
      Goalkeeper: 1/11,
      Defender: 4/11,
      Midfielder: 4/11,
      Forward: 2/11
    };
    
    const actualRatio = {
      Goalkeeper: goalkeeper.length / players.length,
      Defender: defenders.length / players.length,
      Midfielder: midfielders.length / players.length,
      Forward: forwards.length / players.length
    };
    
    if (actualRatio.Forward > idealRatio.Forward * 1.5) {
      suggestions.push("Team is too attack-heavy, consider adding more defensive players");
    }
    
    if (actualRatio.Defender > idealRatio.Defender * 1.5) {
      suggestions.push("Team is too defensive, consider adding more attacking options");
    }
    
    if (players.length < 11) {
      const remaining = 11 - players.length;
      suggestions.push(`Complete your squad by adding ${remaining} more player${remaining > 1 ? 's' : ''}`);
    }
    
    if (budget.remaining < 0) {
      suggestions.push("Over budget! Remove some expensive players or increase your budget");
    }
    
    return {
      overallRating,
      attackRating,
      midfieldRating,
      defenseRating,
      formRating,
      chemistry,
      strengths,
      weaknesses,
      suggestions
    };
  };
  
  const computeCricketAnalytics = (players: PlayerType[]): TeamAnalytics => {
    if (players.length === 0) {
      return {
        overallRating: 0,
        attackRating: 0,
        midfieldRating: 0,
        defenseRating: 0,
        formRating: 0,
        chemistry: 0,
        strengths: [],
        weaknesses: [],
        suggestions: []
      };
    }
    
    // Calculate ratings for cricket 
    const batsmen = players.filter(p => p.position === 'Batsman');
    const allRounders = players.filter(p => p.position === 'All-rounder');
    const bowlers = players.filter(p => p.position === 'Bowler');
    const wicketKeepers = players.filter(p => p.position === 'Wicketkeeper');
    
    const battingRating = [...batsmen, ...allRounders, ...wicketKeepers].length > 0
      ? [...batsmen, ...allRounders, ...wicketKeepers].reduce((sum, p) => sum + p.points, 0) / 
        ([...batsmen, ...allRounders, ...wicketKeepers].length * 10) * 10
      : 0;
      
    const bowlingRating = [...bowlers, ...allRounders].length > 0
      ? [...bowlers, ...allRounders].reduce((sum, p) => sum + p.points, 0) / 
        ([...bowlers, ...allRounders].length * 10) * 10
      : 0;
      
    const fieldingRating = players.length > 0
      ? players.reduce((sum, p) => sum + p.points, 0) / (players.length * 10) * 10
      : 0;
    
    const formScore = players.reduce((sum, p) => {
      if (p.form === 'Excellent') return sum + 10;
      if (p.form === 'Good') return sum + 8;
      if (p.form === 'Moderate') return sum + 6;
      if (p.form === 'Poor') return sum + 4;
      return sum + 5;
    }, 0);
    
    const formRating = formScore / players.length;
    const overallRating = (battingRating + bowlingRating + fieldingRating + formRating) / 4;
    
    // Team chemistry - based on having players from same countries/teams
    const teamCounts: Record<string, number> = {};
    players.forEach(p => {
      teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
    });
    
    const chemistry = Object.values(teamCounts).reduce((sum, count) => {
      if (count >= 3) return sum + 3;
      if (count === 2) return sum + 1;
      return sum;
    }, 0) / (players.length / 2) * 10;
    
    // Identify strengths and weaknesses
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    
    if (battingRating >= 8) strengths.push("Strong batting lineup with high run-scorers");
    if (battingRating < 6) weaknesses.push("Batting lineup needs improvement");
    
    if (bowlingRating >= 8) strengths.push("Excellent bowling attack");
    if (bowlingRating < 6) weaknesses.push("Bowling attack lacks penetration");
    
    if (fieldingRating >= 8) strengths.push("Outstanding fielding unit");
    if (fieldingRating < 6) weaknesses.push("Fielding could use improvement");
    
    if (formRating >= 8) strengths.push("Team is in excellent form");
    if (formRating < 6) weaknesses.push("Several players are out of form");
    
    if (chemistry >= 7) strengths.push("Great team chemistry with players from same teams");
    
    // Balance suggestions
    if (batsmen.length < 3) {
      suggestions.push("Add more specialist batsmen to strengthen the batting lineup");
    }
    
    if (bowlers.length < 3) {
      suggestions.push("Add more specialist bowlers to strengthen the bowling attack");
    }
    
    if (allRounders.length < 1) {
      suggestions.push("Consider adding all-rounders for better team balance");
    }
    
    if (wicketKeepers.length === 0) {
      suggestions.push("Add a wicketkeeper to your team");
    }
    
    if (players.length < 11) {
      const remaining = 11 - players.length;
      suggestions.push(`Complete your squad by adding ${remaining} more player${remaining > 1 ? 's' : ''}`);
    }
    
    if (budget.remaining < 0) {
      suggestions.push("Over budget! Remove some expensive players or increase budget");
    }
    
    return {
      overallRating,
      attackRating: battingRating,
      midfieldRating: fieldingRating,
      defenseRating: bowlingRating,
      formRating,
      chemistry,
      strengths,
      weaknesses,
      suggestions
    };
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
      : allCricketPlayers;

    // Get relevant positions for the selected position slot
    const relevantPositions = selectedPosition ? positionMap[selectedPosition] || [] : [];

    // Get the ID of the currently selected player
    const selectedPlayerId = positionSlots.find(slot => slot.id === selectedPositionSlot)?.player?.id;

    // Filter players: must match position type, not be used in other slots, and be within budget
    const players = allPlayers.filter(player => {
      // Check if player is already used in another slot
      const isUsedElsewhere = positionSlots.some(slot => 
        slot.player?.id === player.id && slot.id !== selectedPositionSlot
      );

      // Include player if it matches position, is within budget, and not used elsewhere or is currently selected
      const isWithinBudget = budget.remaining >= player.price || player.id === selectedPlayerId;
      
      return (
        relevantPositions.includes(player.position) &&
        (!isUsedElsewhere || player.id === selectedPlayerId) &&
        isWithinBudget &&
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Sort players by points (highest first)
    return players.sort((a, b) => b.points - a.points);
  };

  const handleSelectPlayer = (player: PlayerType) => {
    if (selectedPositionSlot) {
      // If this slot already has a player, remove that player's cost from the budget
      const currentSlot = positionSlots.find(slot => slot.id === selectedPositionSlot);
      
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

  const handleRemovePlayer = (slotId: string) => {
    const updatedSlots = positionSlots.map(slot => {
      if (slot.id === slotId) {
        if (slot.player && slot.player.id === selectedPlayer?.id) {
          setSelectedPlayer(null);
        }
        return { ...slot, filled: false, player: null };
      }
      return slot;
    });

    setPositionSlots(updatedSlots);
    setSelectedPositionSlot(null);
    setSelectedPosition(null);
    
    toast({
      title: "Player removed",
      description: "Position is now vacant",
    });
  };
  
  // Handle auto team generation
  const handleApplyAutoTeam = (players: PlayerType[]) => {
    clearSquad(); // Clear the current squad first
    
    // Map auto-generated team to position slots
    const newPositionSlots = [...positionSlots];
    
    // For each player in generated team, find an appropriate slot
    players.forEach(player => {
      const position = player.position;
      
      // Find an empty slot with matching position type
      const availableSlots = newPositionSlots.filter(slot => {
        // Match position to slot type using the positionMap logic
        let match = false;
        
        if (activeTab === 'football') {
          if (position === 'Goalkeeper' && slot.type === 'GK') match = true;
          if (position === 'Defender' && ['LB', 'CB', 'RB', 'LWB', 'RWB'].includes(slot.type)) match = true;
          if (position === 'Midfielder' && ['LM', 'CM', 'RM'].includes(slot.type)) match = true;
          if (position === 'Forward' && ['ST', 'LW', 'RW'].includes(slot.type)) match = true;
        } else {
          if (position === 'Batsman' && ['Opener', 'Top-order', 'Middle-order'].includes(slot.type)) match = true;
          if (position === 'All-rounder' && slot.type === 'All-rounder') match = true;
          if (position === 'Bowler' && slot.type === 'Bowler') match = true;
          if (position === 'Wicketkeeper' && slot.type === 'Wicketkeeper') match = true;
        }
        
        // Must be empty
        return match && !slot.filled;
      });
      
      if (availableSlots.length > 0) {
        // Assign player to the first available matching slot
        const slotToFill = availableSlots[0];
        const slotIndex = newPositionSlots.findIndex(s => s.id === slotToFill.id);
        
        if (slotIndex !== -1) {
          newPositionSlots[slotIndex] = {
            ...newPositionSlots[slotIndex],
            filled: true,
            player: { ...player, positionSlot: newPositionSlots[slotIndex].id }
          };
        }
      }
    });
    
    setPositionSlots(newPositionSlots);
    
    toast({
      title: "Auto team applied",
      description: `${players.length} players automatically positioned in your squad`,
    });
  };

  const handleBudgetChange = (newBudget: number) => {
    setBudget({
      total: newBudget,
      spent: budget.spent,
      remaining: newBudget - budget.spent
    });
    
    toast({
      title: "Budget updated",
      description: `Team budget set to ${newBudget}m`,
    });
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
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-sportiq-black to-[#1A1F2C]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">Squad Builder</h1>
              
              <div className="flex items-center gap-2">
                <Tabs defaultValue="football" value={activeTab} onValueChange={(value) => setActiveTab(value as 'football' | 'cricket')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="football">Football</TabsTrigger>
                    <TabsTrigger value="cricket">Cricket</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button 
                  className="flex items-center gap-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white" 
                  variant="outline" 
                  onClick={saveTeam}
                >
                  <Save className="h-4 w-4" />
                  Save Squad
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Formation selector and visual pitch */}
              <div className="w-full lg:w-2/3 space-y-4">
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'manual' | 'auto')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual">Manual Selection</TabsTrigger>
                    <TabsTrigger value="auto">Auto Team</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {viewMode === 'manual' ? (
                  <>
                    <GlassCard className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Lineup</h2>
                        
                        <div className="flex gap-2">
                          {activeTab === 'football' && (
                            <Select value={activeFormation} onValueChange={(value) => setActiveFormation(value as '442' | '433' | '352')}>
                              <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
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
                      
                      {/* Visual Pitch/Field with new design */}
                      <div className={cn(
                        "relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 backdrop-blur-sm",
                        activeTab === 'football' 
                          ? "bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/70 shadow-inner border border-white/5" 
                          : "bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/70 shadow-inner border border-white/5"
                      )}>
                        {/* Field markings */}
                        {activeTab === 'football' && (
                          <>
                            <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4 border-b border-x border-white/10"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4 border-t border-x border-white/10"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/10"></div>
                            <div className="absolute top-1/2 left-0 h-px w-full bg-white/10"></div>
                          </>
                        )}
                        
                        {activeTab === 'cricket' && (
                          <>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-2/3 bg-[#1A1F2C]/80 rounded-lg border border-white/5"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/2 bg-white/5 rounded-md border border-white/10"></div>
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
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BudgetManager 
                          budget={budget}
                          onBudgetChange={handleBudgetChange}
                        />
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-sm font-medium text-white/80">Squad Status</h4>
                              <p className="text-lg font-bold mt-1">
                                {positionSlots.filter(slot => slot.filled).length}/{positionSlots.length}
                                <span className="text-sm text-white/60 ml-1">positions filled</span>
                              </p>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <p className="text-sm text-white/80">Total Points</p>
                              <p className="text-lg font-bold text-[#9b87f5]">
                                {positionSlots
                                  .filter(slot => slot.filled)
                                  .reduce((total, slot) => total + (slot.player?.points || 0), 0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                    
                    {positionSlots.filter(slot => slot.filled).length > 0 && (
                      <GlassCard className="p-4">
                        <h2 className="text-xl font-bold text-white mb-4">Team Analytics</h2>
                        <TeamAnalyticsComponent 
                          players={positionSlots
                            .filter(slot => slot.filled && slot.player)
                            .map(slot => slot.player as PlayerType)}
                          analytics={teamAnalytics}
                        />
                      </GlassCard>
                    )}
                  </>
                ) : (
                  // Auto Team UI
                  <AutoTeamSelector 
                    sport={activeTab} 
                    onApplyTeam={handleApplyAutoTeam} 
                    budget={budget.total}
                    onBudgetChange={handleBudgetChange}
                  />
                )}
              </div>
              
              {/* Right sidebar with player selection */}
              {viewMode === 'manual' && (
                <div className="w-full lg:w-1/3 space-y-4">
                  <GlassCard className="p-4">
                    <div className="h-[500px] flex flex-col">
                      <div className="flex-1">
                        <PlayerSelection
                          availablePlayers={getFilteredPlayers()}
                          searchQuery={searchQuery}
                          onSearchChange={setSearchQuery}
                          onSelectPlayer={handleSelectPlayer}
                          selectedPosition={selectedPosition}
                          onRemovePlayer={selectedPositionSlot ? () => handleRemovePlayer(selectedPositionSlot) : undefined}
                        />
                      </div>
                      
                      {selectedPlayer && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <PerformanceMetrics player={selectedPlayer} />
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// New components for Auto Team functionality
interface AutoTeamSelectorProps {
  sport: 'football' | 'cricket';
  onApplyTeam: (players: PlayerType[]) => void;
  budget: number;
  onBudgetChange: (total: number) => void;
}

const AutoTeamSelector: React.FC<AutoTeamSelectorProps> = ({ sport, onApplyTeam, budget, onBudgetChange }) => {
  const [teamStyle, setTeamStyle] = useState<'balanced' | 'attacking' | 'defensive'>('balanced');
  const [formation, setFormation] = useState<'442' | '433' | '352'>(sport === 'football' ? '442' : '442');
  const [generatedTeam, setGeneratedTeam] = useState<PlayerType[]>([]);
  const [teamRating, setTeamRating] = useState(0);
  
  const budgetOptions = [50, 75, 100, 150, 200];
  
  const allPlayers = sport === 'football'
    ? [...squadPlayers.filter(p => p.sport === 'football'), ...premierLeaguePlayers]
    : allCricketPlayers;
  
  const generateTeam = () => {
    // Sort players by position and points
    const playersByPosition: Record<string, PlayerType[]> = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Forward: [],
      Batsman: [],
      'All-rounder': [],
      Bowler: [],
      Wicketkeeper: []
    };
    
    // Group players by position
    allPlayers.forEach(player => {
      if (playersByPosition[player.position]) {
        playersByPosition[player.position].push({...player});
      }
    });
    
    // Sort each position group by points (highest first)
    Object.keys(playersByPosition).forEach(pos => {
      playersByPosition[pos].sort((a, b) => b.points - a.points);
    });
    
    // Define requirements based on team style and sport
    let requirements: {position: string, count: number}[] = [];
    
    if (sport === 'football') {
      if (formation === '442') {
        requirements = [
          { position: 'Goalkeeper', count: 1 },
          { position: 'Defender', count: 4 },
          { position: 'Midfielder', count: 4 },
          { position: 'Forward', count: 2 }
        ];
      } else if (formation === '433') {
        requirements = [
          { position: 'Goalkeeper', count: 1 },
          { position: 'Defender', count: 4 },
          { position: 'Midfielder', count: 3 },
          { position: 'Forward', count: 3 }
        ];
      } else if (formation === '352') {
        requirements = [
          { position: 'Goalkeeper', count: 1 },
          { position: 'Defender', count: 5 },
          { position: 'Midfielder', count: 3 },
          { position: 'Forward', count: 2 }
        ];
      }
      
      // Adjust based on team style
      if (teamStyle === 'attacking') {
        // In attacking style, we want higher-scoring players
        Object.keys(playersByPosition).forEach(pos => {
          playersByPosition[pos] = playersByPosition[pos].sort((a, b) => {
            // Prioritize points even more for forwards and midfielders
            if (pos === 'Forward' || pos === 'Midfielder') {
              return b.points - a.points;
            }
            return b.points - a.points;
          });
        });
      } else if (teamStyle === 'defensive') {
        // In defensive style, we want more solid defenders
        Object.keys(playersByPosition).forEach(pos => {
          playersByPosition[pos] = playersByPosition[pos].sort((a, b) => {
            // Prioritize form for defenders and goalkeepers
            if (pos === 'Defender' || pos === 'Goalkeeper') {
              const formValueA = a.form === 'Excellent' ? 10 : a.form === 'Good' ? 8 : 5;
              const formValueB = b.form === 'Excellent' ? 10 : b.form === 'Good' ? 8 : 5;
              return (b.points + formValueB) - (a.points + formValueA);
            }
            return b.points - a.points;
          });
        });
      }
    } else {
      // Cricket
      requirements = [
        { position: 'Batsman', count: 5 },
        { position: 'All-rounder', count: 2 },
        { position: 'Bowler', count: 3 },
        { position: 'Wicketkeeper', count: 1 }
      ];
      
      // Adjust based on team style
      if (teamStyle === 'attacking') {
        // More batsmen
        requirements[0].count = 6;
        requirements[1].count = 1;
        requirements[2].count = 3;
      } else if (teamStyle === 'defensive') {
        // More bowlers
        requirements[0].count = 4;
        requirements[1].count = 2;
        requirements[2].count = 4;
      }
    }
    
    // Select players while staying within budget
    const team: PlayerType[] = [];
    let remainingBudget = budget;
    
    requirements.forEach(({ position, count }) => {
      const availablePlayers = playersByPosition[position]
        .filter(p => p.price <= remainingBudget)
        .slice(0, count);
      
      team.push(...availablePlayers);
      remainingBudget -= availablePlayers.reduce((sum, p) => sum + p.price, 0);
    });
    
    setGeneratedTeam(team);
    
    // Calculate team rating
    const avgRating = team.reduce((sum, p) => sum + p.points, 0) / (team.length || 1) / 10;
    setTeamRating(avgRating);
    
    toast({
      title: `${teamStyle.charAt(0).toUpperCase() + teamStyle.slice(1)} team generated!`,
      description: `Created a team with ${team.length} players based on your preferences.`
    });
  };
  
  const handleApplyTeam = () => {
    if (generatedTeam.length > 0) {
      onApplyTeam(generatedTeam);
    } else {
      toast({
        title: "No team to apply",
        description: "Please generate a team first",
        variant: "destructive"
      });
    }
  };
  
  return (
    <GlassCard className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Auto Team Generator</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Team Style</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={teamStyle === 'balanced' ? "default" : "outline"}
                className={teamStyle === 'balanced' 
                  ? "bg-[#9b87f5] hover:bg-[#7E69AB]" 
                  : "border-[#9b87f5]/20 text-[#9b87f5] hover:bg-[#9b87f5]/10"
                }
                onClick={() => setTeamStyle('balanced')}
              >
                Balanced
              </Button>
              <Button 
                variant={teamStyle === 'attacking' ? "default" : "outline"}
                className={teamStyle === 'attacking' 
                  ? "bg-[#6E59A5] hover:bg-[#6E59A5]/80" 
                  : "border-[#6E59A5]/20 text-[#6E59A5] hover:bg-[#6E59A5]/10"
                }
                onClick={() => setTeamStyle('attacking')}
              >
                Attacking
              </Button>
              <Button 
                variant={teamStyle === 'defensive' ? "default" : "outline"}
                className={teamStyle === 'defensive' 
                  ? "bg-[#D6BCFA] hover:bg-[#D6BCFA]/80 text-black" 
                  : "border-[#D6BCFA]/20 text-[#D6BCFA] hover:bg-[#D6BCFA]/10"
                }
                onClick={() => setTeamStyle('defensive')}
              >
                Defensive
              </Button>
            </div>
          </div>
          
          {sport === 'football' && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Formation</label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={formation === '442' ? "default" : "outline"}
                  className={formation === '442' 
                    ? "bg-white/10 hover:bg-white/15" 
                    : "border-white/10 hover:bg-white/5"
                  }
                  onClick={() => setFormation('442')}
                >
                  4-4-2
                </Button>
                <Button 
                  variant={formation === '433' ? "default" : "outline"}
                  className={formation === '433' 
                    ? "bg-white/10 hover:bg-white/15" 
                    : "border-white/10 hover:bg-white/5"
                  }
                  onClick={() => setFormation('433')}
                >
                  4-3-3
                </Button>
                <Button 
                  variant={formation === '352' ? "default" : "outline"}
                  className={formation === '352' 
                    ? "bg-white/10 hover:bg-white/15" 
                    : "border-white/10 hover:bg-white/5"
                  }
                  onClick={() => setFormation('352')}
                >
                  3-5-2
                </Button>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Budget</label>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map(option => (
                <Button
                  key={option}
                  variant={budget === option ? "default" : "outline"}
                  className={budget === option 
                    ? "bg-white/10 hover:bg-white/15" 
                    : "border-white/10 hover:bg-white/5"
                  }
                  onClick={() => onBudgetChange(option)}
                >
                  {option}m
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-medium mb-2 text-white/80">Team Details</h3>
            <p className="text-sm text-white/60 mb-4">
              Generate a {teamStyle} team with the best players available within your budget. The auto-generator will optimize for:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-[#9b87f5] mr-2"></div>
                {teamStyle === 'balanced' && "Well-rounded team with high points"}
                {teamStyle === 'attacking' && "High-scoring players in attacking positions"}
                {teamStyle === 'defensive' && "Strong defense and solid team structure"}
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-[#9b87f5] mr-2"></div>
                Players within your {budget}m budget
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-[#9b87f5] mr-2"></div>
                {sport === 'football' ? `${formation} formation` : 'Standard cricket XI'}
              </li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] hover:from-[#7E69AB] hover:to-[#6E59A5] text-white mt-4"
            onClick={generateTeam}
          >
            Generate Team
          </Button>
        </div>
      </div>
      
      {generatedTeam.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-bold">Generated Team</h3>
              <div className="ml-4 bg-white/10 px-3 py-1 rounded-full flex items-center">
                <span className="text-sm font-medium">Rating: </span>
                <span className="text-[#9b87f5] ml-1 font-bold">{teamRating.toFixed(1)}</span>
              </div>
            </div>
            
            <Button
              onClick={handleApplyTeam}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white flex items-center gap-2"
            >
              Apply Team <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2">
            {generatedTeam.map(player => (
              <div
                key={player.id}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#9b87f5]/70 to-[#6E59A5]/70 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                  <div className="flex text-xs text-white/70">
                    <span>{player.position}</span>
                    <span className="mx-1">•</span>
                    <span>{player.team}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-[#9b87f5]/20 text-[#9b87f5] px-2 py-0.5 rounded text-xs">
                    {player.points} pts
                  </span>
                  <span className="text-xs text-white/50 mt-1">{player.price}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default SquadBuilder;
