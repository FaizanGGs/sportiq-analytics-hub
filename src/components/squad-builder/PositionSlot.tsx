
import React from 'react';
import { User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayerType, PositionSlot } from '@/types/player';

interface PositionSlotProps {
  slot: PositionSlot;
  onSelectPosition: (slotId: string) => void;
  isSelected: boolean;
  activeFormation: string;
}

const PositionSlotComponent: React.FC<PositionSlotProps> = ({ 
  slot, 
  onSelectPosition, 
  isSelected,
  activeFormation
}) => {
  return (
    <div
      className={cn(
        "absolute w-14 h-14 flex items-center justify-center transition-all duration-200",
        isSelected ? "scale-110 z-10" : "",
        slot.filled 
          ? "bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg" 
          : "bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
      )}
      style={{ 
        left: `${slot.position.x}%`, 
        top: `${slot.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={() => onSelectPosition(slot.id)}
      data-formation={activeFormation}
    >
      {slot.filled && slot.player ? (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9b87f5]/70 to-[#6E59A5]/70 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-white mt-1 whitespace-nowrap max-w-[80px] truncate">{slot.player.name}</span>
          <span className="text-xs text-white/70 whitespace-nowrap">{slot.player.position}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <Plus className="w-5 h-5 text-white/70" />
          </div>
          <span className="text-xs text-white/70 whitespace-nowrap">{slot.type}</span>
        </div>
      )}
    </div>
  );
};

export default PositionSlotComponent;
