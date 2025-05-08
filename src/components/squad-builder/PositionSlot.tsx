
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
        slot.filled ? "bg-sportiq-blue/30 rounded-full" : "bg-sportiq-lightgray/20 rounded-full"
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
          <div className="w-10 h-10 rounded-full bg-sportiq-blue flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-white mt-1 whitespace-nowrap">{slot.player.name}</span>
          <span className="text-xs text-white/70 whitespace-nowrap">{slot.player.position}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-sportiq-lightgray/30 flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-white/70 whitespace-nowrap">{slot.type}</span>
        </div>
      )}
    </div>
  );
};

export default PositionSlotComponent;
