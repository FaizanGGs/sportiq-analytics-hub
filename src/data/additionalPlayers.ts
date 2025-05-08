// Additional Premier League players data for the 2024/2025 season
import { PlayerType } from '@/types/player';

export const premierLeaguePlayers: PlayerType[] = [
  // Forwards
  {
    id: 101,
    name: "Erling Haaland",
    position: "Forward",
    team: "Manchester City",
    price: 14.5,
    form: "8.9",
    points: 302,
    selected: false,
    sport: 'football',
    stats: {
      goals: 36,
      assists: 8,
      minutesPlayed: 2736,
      cleanSheets: 0,
      shotsOnTarget: 89
    }
  },
  {
    id: 102,
    name: "Heung-Min Son",
    position: "Forward",
    team: "Tottenham Hotspur",
    price: 10.2,
    form: "7.8",
    points: 213,
    selected: false,
    sport: 'football',
    stats: {
      goals: 23,
      assists: 10,
      minutesPlayed: 2980,
      cleanSheets: 0,
      shotsOnTarget: 76
    }
  },
  {
    id: 103,
    name: "Darwin Núñez",
    position: "Forward",
    team: "Liverpool",
    price: 7.8,
    form: "7.2",
    points: 189,
    selected: false,
    sport: 'football',
    stats: {
      goals: 18,
      assists: 7,
      minutesPlayed: 2450,
      cleanSheets: 0,
      shotsOnTarget: 82
    }
  },
  {
    id: 104,
    name: "Alexander Isak",
    position: "Forward",
    team: "Newcastle United",
    price: 8.7,
    form: "7.5",
    points: 196,
    selected: false,
    sport: 'football',
    stats: {
      goals: 21,
      assists: 5,
      minutesPlayed: 2620,
      cleanSheets: 0,
      shotsOnTarget: 68
    }
  },
  
  // Midfielders
  {
    id: 105,
    name: "Kevin De Bruyne",
    position: "Midfielder",
    team: "Manchester City",
    price: 10.5,
    form: "8.4",
    points: 224,
    selected: false,
    sport: 'football',
    stats: {
      goals: 9,
      assists: 18,
      minutesPlayed: 2340,
      cleanSheets: 0,
      shotsOnTarget: 42
    }
  },
  {
    id: 106,
    name: "Bruno Fernandes",
    position: "Midfielder",
    team: "Manchester United",
    price: 8.9,
    form: "7.6",
    points: 201,
    selected: false,
    sport: 'football',
    stats: {
      goals: 10,
      assists: 14,
      minutesPlayed: 3100,
      cleanSheets: 0,
      shotsOnTarget: 58
    }
  },
  {
    id: 107,
    name: "Bukayo Saka",
    position: "Midfielder",
    team: "Arsenal",
    price: 9.7,
    form: "8.1",
    points: 218,
    selected: false,
    sport: 'football',
    stats: {
      goals: 17,
      assists: 12,
      minutesPlayed: 2950,
      cleanSheets: 0,
      shotsOnTarget: 64
    }
  },
  {
    id: 108,
    name: "James Maddison",
    position: "Midfielder",
    team: "Tottenham Hotspur",
    price: 8.2,
    form: "7.3",
    points: 176,
    selected: false,
    sport: 'football',
    stats: {
      goals: 8,
      assists: 11,
      minutesPlayed: 2680,
      cleanSheets: 0,
      shotsOnTarget: 46
    }
  },
  
  // Defenders
  {
    id: 109,
    name: "Virgil van Dijk",
    position: "Defender",
    team: "Liverpool",
    price: 6.8,
    form: "7.9",
    points: 184,
    selected: false,
    sport: 'football',
    stats: {
      goals: 5,
      assists: 2,
      minutesPlayed: 3060,
      cleanSheets: 16,
      shotsOnTarget: 18
    }
  },
  {
    id: 110,
    name: "William Saliba",
    position: "Defender",
    team: "Arsenal",
    price: 6.0,
    form: "7.7",
    points: 171,
    selected: false,
    sport: 'football',
    stats: {
      goals: 3,
      assists: 1,
      minutesPlayed: 3240,
      cleanSheets: 18,
      shotsOnTarget: 12
    }
  },
  {
    id: 111,
    name: "Reece James",
    position: "Defender",
    team: "Chelsea",
    price: 5.8,
    form: "7.2",
    points: 142,
    selected: false,
    sport: 'football',
    stats: {
      goals: 2,
      assists: 7,
      minutesPlayed: 2150,
      cleanSheets: 12,
      shotsOnTarget: 16
    }
  },
  {
    id: 112,
    name: "Ruben Dias",
    position: "Defender",
    team: "Manchester City",
    price: 6.5,
    form: "7.8",
    points: 168,
    selected: false,
    sport: 'football',
    stats: {
      goals: 2,
      assists: 3,
      minutesPlayed: 2980,
      cleanSheets: 19,
      shotsOnTarget: 10
    }
  },
  
  // Goalkeepers
  {
    id: 113,
    name: "Alisson",
    position: "Goalkeeper",
    team: "Liverpool",
    price: 5.9,
    form: "7.5",
    points: 156,
    selected: false,
    sport: 'football',
    stats: {
      goals: 0,
      assists: 1,
      minutesPlayed: 3150,
      cleanSheets: 16,
      saves: 118
    }
  },
  {
    id: 114,
    name: "Ederson",
    position: "Goalkeeper",
    team: "Manchester City",
    price: 5.7,
    form: "7.6",
    points: 162,
    selected: false,
    sport: 'football',
    stats: {
      goals: 0,
      assists: 0,
      minutesPlayed: 3060,
      cleanSheets: 19,
      saves: 96
    }
  },
  {
    id: 115,
    name: "David Raya",
    position: "Goalkeeper",
    team: "Arsenal",
    price: 5.3,
    form: "7.4",
    points: 154,
    selected: false,
    sport: 'football',
    stats: {
      goals: 0,
      assists: 0,
      minutesPlayed: 3240,
      cleanSheets: 18,
      saves: 112
    }
  }
];
