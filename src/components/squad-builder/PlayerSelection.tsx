
import React from 'react';
import { User, Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PlayerType } from '@/types/player';
import { Button } from '@/components/ui/button';

interface PlayerSelectionProps {
  availablePlayers: PlayerType[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectPlayer: (player: PlayerType) => void;
  selectedPosition: string | null;
  onRemovePlayer?: () => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  availablePlayers,
  searchQuery,
  onSearchChange,
  onSelectPlayer,
  selectedPosition,
  onRemovePlayer,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold text-white/80">{selectedPosition ? `Select ${selectedPosition}` : 'Select a position first'}</h3>
        
        {onRemovePlayer && selectedPosition && (
          <Button
            size="sm"
            variant="outline"
            className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
            onClick={onRemovePlayer}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          className="pl-9 bg-white/5 border-white/10 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={!selectedPosition}
        />
      </div>
      
      <div className="flex-1 overflow-auto space-y-1.5 pr-2 scrollbar-thin">
        {selectedPosition ? (
          availablePlayers.length > 0 ? (
            availablePlayers.map((player) => (
              <div
                key={player.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3",
                  "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20"
                )}
                onClick={() => onSelectPlayer(player)}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#9b87f5]/70 to-[#6E59A5]/70 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{player.name}</p>
                  <div className="flex text-xs text-white/70">
                    <span>{player.team}</span>
                    <span className="mx-1">•</span>
                    <span>{player.position}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-[#9b87f5]/20 text-[#9b87f5] px-2 py-0.5 rounded text-xs">
                    {player.points} pts
                  </span>
                  <span className="text-xs text-white/50 mt-1">{player.price}m</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
              <Search className="h-8 w-8 text-white/30 mx-auto mb-2" />
              <p className="text-white/70">No players found matching "{searchQuery}"</p>
              <p className="text-sm text-white/50 mt-1">Try adjusting your search or filters</p>
            </div>
          )
        ) : (
          <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <User className="h-8 w-8 text-white/30 mx-auto mb-2" />
            <p className="text-white/70">Select a position on the field first</p>
            <p className="text-sm text-white/50 mt-1">Click on any position to view available players</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
