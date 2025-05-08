
import React from 'react';
import { User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PlayerType } from '@/types/player';

interface PlayerSelectionProps {
  availablePlayers: PlayerType[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectPlayer: (player: PlayerType) => void;
  selectedPosition: string | null;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  availablePlayers,
  searchQuery,
  onSearchChange,
  onSelectPlayer,
  selectedPosition,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold mb-2">{selectedPosition ? `Select ${selectedPosition}` : 'Select a position first'}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            className="pl-9 bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={!selectedPosition}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto space-y-2 pr-2">
        {selectedPosition ? (
          availablePlayers.length > 0 ? (
            availablePlayers.map((player) => (
              <div
                key={player.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3",
                  "bg-sportiq-lightgray/20 hover:bg-sportiq-lightgray/30"
                )}
                onClick={() => onSelectPlayer(player)}
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
                <div className="flex items-center">
                  <span className="bg-sportiq-purple/20 text-sportiq-purple px-2 py-0.5 rounded text-xs">
                    {player.points} pts
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-white/50">
              No players found matching "{searchQuery}"
            </div>
          )
        ) : (
          <div className="text-center p-4 text-white/50">
            Select a position on the field to view available players
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
