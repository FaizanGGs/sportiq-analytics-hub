
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
  rating?: number; // Player rating out of 10
  strengthScore?: number; // Strength metric for analytics
  weaknessScore?: number; // Weakness metric for analytics
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

// Budget interface for squad builder
export interface BudgetInfo {
  total: number;
  spent: number;
  remaining: number;
}

// Team analytics interface
export interface TeamAnalytics {
  overallRating: number;
  attackRating: number;
  midfieldRating: number;
  defenseRating: number;
  formRating: number;
  chemistry: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
