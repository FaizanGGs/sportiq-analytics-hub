
// Player type definition
export interface PlayerType {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  form: string;
  points: number;
  selected: boolean;
  sport: 'football' | 'cricket';
  stats?: {
    [key: string]: number | string;
  };
  positionSlot?: string; // Added for tracking position slot in squad builder
}

// Team formation and position requirements
export interface FormationTemplate {
  name: string;
  positions: {
    Goalkeeper?: number;
    Defender: number;
    Midfielder: number;
    Forward: number;
  };
}

// Position slot definition for squad builder
export interface PositionSlot {
  id: string;
  type: string;
  filled: boolean;
  player: PlayerType | null;
  position: { x: number; y: number };
}
