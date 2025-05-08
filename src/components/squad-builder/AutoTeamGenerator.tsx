
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PlayerType, FormationTemplate } from '@/types/player';
import { Check, User } from 'lucide-react';

interface AutoTeamGeneratorProps {
  availablePlayers: PlayerType[];
  formations: Record<string, FormationTemplate>;
  onApplyTeam: (players: PlayerType[]) => void;
  sport: 'football' | 'cricket';
}

const AutoTeamGenerator: React.FC<AutoTeamGeneratorProps> = ({
  availablePlayers,
  formations,
  onApplyTeam,
  sport
}) => {
  const [teamType, setTeamType] = useState<'balanced' | 'defensive' | 'attacking'>('balanced');
  const [generatedTeam, setGeneratedTeam] = useState<PlayerType[]>([]);

  const generateAutoTeam = () => {
    if (sport !== 'football') {
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
    availablePlayers.forEach(player => {
      if (sortedPlayers[player.position]) {
        sortedPlayers[player.position].push({...player, positionSlot: null});
      }
    });

    // Sort each position group by points (highest first)
    Object.keys(sortedPlayers).forEach(pos => {
      sortedPlayers[pos].sort((a, b) => b.points - a.points);
    });

    // Build team according to formation
    Object.keys(requiredPositions).forEach(position => {
      const count = requiredPositions[position as keyof typeof requiredPositions];
      const bestPlayers = sortedPlayers[position].slice(0, count).map(player => ({
        ...player,
        positionSlot: position
      }));
      newTeam.push(...bestPlayers);
    });

    setGeneratedTeam(newTeam);
    
    toast({
      title: `${formation.name} team generated!`,
      description: `Created a team with ${newTeam.length} players based on highest points.`
    });
  };

  const applyTeam = () => {
    onApplyTeam(generatedTeam);
    toast({
      title: "Team applied to lineup",
      description: "The auto-generated team has been applied to your lineup."
    });
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold mb-4">Auto Team Generator</h3>
      
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
      
      <div className="mb-4 bg-sportiq-lightgray/20 p-3 rounded-lg">
        <h4 className="font-medium mb-2">Formation Details</h4>
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
      
      <Button 
        className="w-full bg-sportiq-gold text-black hover:bg-sportiq-gold/90 mb-4"
        onClick={generateAutoTeam}
      >
        Generate {teamType.charAt(0).toUpperCase() + teamType.slice(1)} Team
      </Button>
      
      {generatedTeam.length > 0 && (
        <>
          <div className="flex-1 overflow-auto">
            <h4 className="font-medium mb-2">Generated Team</h4>
            <div className="space-y-2">
              {generatedTeam.map(player => (
                <div key={player.id} className="bg-sportiq-lightgray/20 p-2 rounded-lg flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-sportiq-lightgray/30 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-white/70">{player.position}</p>
                  </div>
                  <div className="bg-sportiq-blue/20 px-2 py-0.5 rounded text-xs text-sportiq-blue">
                    {player.points} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            className="w-full mt-2 flex items-center gap-2"
            onClick={applyTeam}
          >
            <Check className="h-4 w-4" /> Apply to Lineup
          </Button>
        </>
      )}
    </div>
  );
};

export default AutoTeamGenerator;
