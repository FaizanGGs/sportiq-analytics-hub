
export const recentMatches = [
  {
    id: 1,
    tournament: 'EPL',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 1,
    date: '2024-02-20',
    prediction: {
      accuracy: 0.78,
      predicted: 'Arsenal',
      actual: 'Arsenal'
    }
  },
  {
    id: 2,
    tournament: 'PSL',
    homeTeam: 'Karachi Kings',
    awayTeam: 'Lahore Qalandars',
    homeScore: 185,
    awayScore: 183,
    date: '2024-02-19',
    prediction: {
      accuracy: 0.65,
      predicted: 'Lahore Qalandars',
      actual: 'Karachi Kings'
    }
  }
];

export const performanceStats = [
  { date: '2024-01', value: 75 },
  { date: '2024-02', value: 82 },
  { date: '2024-03', value: 88 },
  { date: '2024-04', value: 85 },
  { date: '2024-05', value: 92 }
];

export const teamPerformance = {
  'Arsenal': {
    form: 'WWDLW',
    position: 1,
    points: 52,
    goalsScored: 45,
    goalsConceded: 20,
    xG: 42.5,
    xGA: 22.3
  },
  'Liverpool': {
    form: 'WDWWL',
    position: 2,
    points: 50,
    goalsScored: 43,
    goalsConceded: 22,
    xG: 40.2,
    xGA: 24.1
  }
};

// Enhanced data for Squad Builder
export const squadPlayers = [
  {
    id: 1,
    name: 'Mohamed Salah',
    position: 'Forward',
    team: 'Liverpool',
    price: 12.5,
    form: 'WDWWL',
    points: 85,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 22,
      assists: 13,
      minutesPlayed: 2340,
      shotsOnTarget: 48
    }
  },
  {
    id: 2,
    name: 'Kevin De Bruyne',
    position: 'Midfielder',
    team: 'Man City',
    price: 10.8,
    form: 'WWDLW',
    points: 78,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 8,
      assists: 18,
      minutesPlayed: 2105,
      shotsOnTarget: 32
    }
  },
  {
    id: 3,
    name: 'Erling Haaland',
    position: 'Forward',
    team: 'Man City',
    price: 14.2,
    form: 'WWWLW',
    points: 92,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 27,
      assists: 5,
      minutesPlayed: 2280,
      shotsOnTarget: 62
    }
  },
  {
    id: 4,
    name: 'Bukayo Saka',
    position: 'Midfielder',
    team: 'Arsenal',
    price: 9.5,
    form: 'WWDLW',
    points: 80,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 14,
      assists: 12,
      minutesPlayed: 2420,
      shotsOnTarget: 38
    }
  },
  {
    id: 5,
    name: 'Virgil van Dijk',
    position: 'Defender',
    team: 'Liverpool',
    price: 8.7,
    form: 'WDWWL',
    points: 75,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 3,
      assists: 1,
      minutesPlayed: 2520,
      cleanSheets: 12
    }
  },
  {
    id: 6,
    name: 'Trent Alexander-Arnold',
    position: 'Defender',
    team: 'Liverpool',
    price: 8.2,
    form: 'WDWWL',
    points: 73,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 2,
      assists: 14,
      minutesPlayed: 2340,
      cleanSheets: 10
    }
  },
  {
    id: 7,
    name: 'Martin Ødegaard',
    position: 'Midfielder',
    team: 'Arsenal',
    price: 9.8,
    form: 'WWDWD',
    points: 82,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 10,
      assists: 9,
      minutesPlayed: 2450,
      shotsOnTarget: 35
    }
  },
  {
    id: 8,
    name: 'Alisson Becker',
    position: 'Goalkeeper',
    team: 'Liverpool',
    price: 7.5,
    form: 'WDWWL',
    points: 68,
    selected: false,
    sport: 'football' as const,
    stats: {
      cleanSheets: 14,
      saves: 98,
      minutesPlayed: 2610,
      penaltiesSaved: 3
    }
  },
  {
    id: 9,
    name: 'Harry Kane',
    position: 'Forward',
    team: 'Bayern Munich',
    price: 11.8,
    form: 'WWDLW',
    points: 84,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 24,
      assists: 8,
      minutesPlayed: 2500,
      shotsOnTarget: 56
    }
  },
  {
    id: 10,
    name: 'Bruno Fernandes',
    position: 'Midfielder',
    team: 'Man United',
    price: 10.2,
    form: 'DLWWL',
    points: 76,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 9,
      assists: 12,
      minutesPlayed: 2580,
      shotsOnTarget: 42
    }
  },
  {
    id: 11,
    name: 'Rodri',
    position: 'Midfielder',
    team: 'Man City',
    price: 8.9,
    form: 'WWDLW',
    points: 72,
    selected: false,
    sport: 'football' as const,
    stats: {
      goals: 5,
      assists: 7,
      minutesPlayed: 2490,
      passAccuracy: 94
    }
  },
  {
    id: 12,
    name: 'Ederson',
    position: 'Goalkeeper',
    team: 'Man City',
    price: 7.3,
    form: 'WWDLW',
    points: 65,
    selected: false,
    sport: 'football' as const,
    stats: {
      cleanSheets: 12,
      saves: 78,
      minutesPlayed: 2520,
      penaltiesSaved: 1
    }
  },
  // Cricket players
  {
    id: 13,
    name: 'Babar Azam',
    position: 'Batsman',
    team: 'Karachi Kings',
    price: 11.2,
    form: 'WLWWD',
    points: 88,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 520,
      avg: 48.5,
      strikeRate: 138.2,
      centuries: 2
    }
  },
  {
    id: 14,
    name: 'Shaheen Afridi',
    position: 'Bowler',
    team: 'Lahore Qalandars',
    price: 9.8,
    form: 'WWLLD',
    points: 82,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      wickets: 18,
      economy: 7.2,
      bowling_avg: 18.4,
      bestBowling: '4/22'
    }
  },
  {
    id: 15,
    name: 'Rashid Khan',
    position: 'Bowler',
    team: 'Lahore Qalandars',
    price: 10.5,
    form: 'WWLLD',
    points: 84,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      wickets: 16,
      economy: 6.8,
      bowling_avg: 17.2,
      bestBowling: '4/19'
    }
  },
  {
    id: 16,
    name: 'Virat Kohli',
    position: 'Batsman',
    team: 'Royal Challengers',
    price: 12.8,
    form: 'WWWDL',
    points: 90,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 580,
      avg: 52.7,
      strikeRate: 142.8,
      centuries: 3
    }
  },
  {
    id: 17,
    name: 'Jasprit Bumrah',
    position: 'Bowler',
    team: 'Mumbai Indians',
    price: 10.2,
    form: 'LWWWD',
    points: 86,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      wickets: 21,
      economy: 6.3,
      bowling_avg: 16.8,
      bestBowling: '5/18'
    }
  },
  {
    id: 18,
    name: 'Jos Buttler',
    position: 'Wicketkeeper',
    team: 'Rajasthan Royals',
    price: 10.8,
    form: 'WLWWW',
    points: 85,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 490,
      avg: 44.5,
      strikeRate: 153.6,
      dismissals: 18
    }
  },
  {
    id: 19,
    name: 'Andre Russell',
    position: 'All-rounder',
    team: 'Kolkata Knight Riders',
    price: 11.5,
    form: 'WWDLW',
    points: 87,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 320,
      wickets: 14,
      strikeRate: 178.2,
      economy: 8.9
    }
  },
  {
    id: 20,
    name: 'Kane Williamson',
    position: 'Batsman',
    team: 'Sunrisers Hyderabad',
    price: 9.6,
    form: 'LDWWW',
    points: 79,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 410,
      avg: 41.0,
      strikeRate: 132.5,
      centuries: 1
    }
  },
  {
    id: 21,
    name: 'Hardik Pandya',
    position: 'All-rounder',
    team: 'Mumbai Indians',
    price: 10.8,
    form: 'WLWDW',
    points: 84,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 350,
      wickets: 12,
      strikeRate: 168.3,
      economy: 8.4
    }
  },
  {
    id: 22,
    name: 'Trent Boult',
    position: 'Bowler',
    team: 'Rajasthan Royals',
    price: 9.4,
    form: 'WWLWD',
    points: 80,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      wickets: 17,
      economy: 7.6,
      bowling_avg: 18.9,
      bestBowling: '4/25'
    }
  },
  {
    id: 23,
    name: 'Shadab Khan',
    position: 'All-rounder',
    team: 'Islamabad United',
    price: 9.2,
    form: 'WLWWD',
    points: 78,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 280,
      wickets: 15,
      strikeRate: 145.7,
      economy: 7.8
    }
  },
  {
    id: 24,
    name: 'Mohammad Rizwan',
    position: 'Wicketkeeper',
    team: 'Multan Sultans',
    price: 10.4,
    form: 'WWWLD',
    points: 83,
    selected: false,
    sport: 'cricket' as const,
    stats: {
      runs: 450,
      avg: 42.8,
      strikeRate: 137.5,
      dismissals: 15
    }
  }
];

// Football formations
export const footballFormations = [
  {
    name: '4-3-3',
    positions: [
      { id: 'Goalkeeper', name: 'GK', x: 50, y: 90 },
      { id: 'Defender', name: 'LB', x: 20, y: 75 },
      { id: 'Defender', name: 'CB', x: 40, y: 75 },
      { id: 'Defender', name: 'CB', x: 60, y: 75 },
      { id: 'Defender', name: 'RB', x: 80, y: 75 },
      { id: 'Midfielder', name: 'CM', x: 30, y: 55 },
      { id: 'Midfielder', name: 'CM', x: 50, y: 50 },
      { id: 'Midfielder', name: 'CM', x: 70, y: 55 },
      { id: 'Forward', name: 'LW', x: 25, y: 30 },
      { id: 'Forward', name: 'ST', x: 50, y: 25 },
      { id: 'Forward', name: 'RW', x: 75, y: 30 }
    ]
  },
  {
    name: '4-4-2',
    positions: [
      { id: 'Goalkeeper', name: 'GK', x: 50, y: 90 },
      { id: 'Defender', name: 'LB', x: 20, y: 75 },
      { id: 'Defender', name: 'CB', x: 40, y: 75 },
      { id: 'Defender', name: 'CB', x: 60, y: 75 },
      { id: 'Defender', name: 'RB', x: 80, y: 75 },
      { id: 'Midfielder', name: 'LM', x: 20, y: 50 },
      { id: 'Midfielder', name: 'CM', x: 40, y: 50 },
      { id: 'Midfielder', name: 'CM', x: 60, y: 50 },
      { id: 'Midfielder', name: 'RM', x: 80, y: 50 },
      { id: 'Forward', name: 'ST', x: 40, y: 25 },
      { id: 'Forward', name: 'ST', x: 60, y: 25 }
    ]
  },
  {
    name: '3-5-2',
    positions: [
      { id: 'Goalkeeper', name: 'GK', x: 50, y: 90 },
      { id: 'Defender', name: 'CB', x: 30, y: 75 },
      { id: 'Defender', name: 'CB', x: 50, y: 75 },
      { id: 'Defender', name: 'CB', x: 70, y: 75 },
      { id: 'Midfielder', name: 'LWB', x: 15, y: 60 },
      { id: 'Midfielder', name: 'CM', x: 30, y: 50 },
      { id: 'Midfielder', name: 'CM', x: 50, y: 50 },
      { id: 'Midfielder', name: 'CM', x: 70, y: 50 },
      { id: 'Midfielder', name: 'RWB', x: 85, y: 60 },
      { id: 'Forward', name: 'ST', x: 40, y: 25 },
      { id: 'Forward', name: 'ST', x: 60, y: 25 }
    ]
  },
  {
    name: '4-2-3-1',
    positions: [
      { id: 'Goalkeeper', name: 'GK', x: 50, y: 90 },
      { id: 'Defender', name: 'LB', x: 20, y: 75 },
      { id: 'Defender', name: 'CB', x: 40, y: 75 },
      { id: 'Defender', name: 'CB', x: 60, y: 75 },
      { id: 'Defender', name: 'RB', x: 80, y: 75 },
      { id: 'Midfielder', name: 'CDM', x: 40, y: 60 },
      { id: 'Midfielder', name: 'CDM', x: 60, y: 60 },
      { id: 'Midfielder', name: 'CAM', x: 50, y: 45 },
      { id: 'Midfielder', name: 'LW', x: 25, y: 40 },
      { id: 'Midfielder', name: 'RW', x: 75, y: 40 },
      { id: 'Forward', name: 'ST', x: 50, y: 25 }
    ]
  }
];

// Cricket formations
export const cricketFormations = [
  {
    name: 'Standard XI',
    positions: [
      { id: 'Batsman', name: 'Opener', x: 25, y: 20 },
      { id: 'Batsman', name: 'Opener', x: 40, y: 20 },
      { id: 'Batsman', name: 'No.3', x: 55, y: 20 },
      { id: 'Batsman', name: 'No.4', x: 70, y: 20 },
      { id: 'Wicketkeeper', name: 'WK', x: 20, y: 40 },
      { id: 'All-rounder', name: 'AR', x: 40, y: 40 },
      { id: 'All-rounder', name: 'AR', x: 60, y: 40 },
      { id: 'Bowler', name: 'Bowler', x: 20, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 40, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 60, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 80, y: 60 }
    ]
  },
  {
    name: 'Batting Heavy',
    positions: [
      { id: 'Batsman', name: 'Opener', x: 25, y: 20 },
      { id: 'Batsman', name: 'Opener', x: 40, y: 20 },
      { id: 'Batsman', name: 'No.3', x: 55, y: 20 },
      { id: 'Batsman', name: 'No.4', x: 70, y: 20 },
      { id: 'Batsman', name: 'No.5', x: 85, y: 20 },
      { id: 'Wicketkeeper', name: 'WK', x: 30, y: 40 },
      { id: 'All-rounder', name: 'AR', x: 50, y: 40 },
      { id: 'All-rounder', name: 'AR', x: 70, y: 40 },
      { id: 'Bowler', name: 'Bowler', x: 30, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 50, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 70, y: 60 }
    ]
  },
  {
    name: 'Bowling Heavy',
    positions: [
      { id: 'Batsman', name: 'Opener', x: 30, y: 20 },
      { id: 'Batsman', name: 'Opener', x: 50, y: 20 },
      { id: 'Batsman', name: 'No.3', x: 70, y: 20 },
      { id: 'Wicketkeeper', name: 'WK', x: 40, y: 40 },
      { id: 'All-rounder', name: 'AR', x: 60, y: 40 },
      { id: 'Bowler', name: 'Bowler', x: 20, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 35, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 50, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 65, y: 60 },
      { id: 'Bowler', name: 'Bowler', x: 80, y: 60 },
      { id: 'Bowler', name: 'Spinner', x: 50, y: 80 }
    ]
  },
  {
    name: 'Balanced XI',
    positions: [
      { id: 'Batsman', name: 'Opener', x: 30, y: 20 },
      { id: 'Batsman', name: 'Opener', x: 50, y: 20 },
      { id: 'Batsman', name: 'No.3', x: 70, y: 20 },
      { id: 'Batsman', name: 'No.4', x: 40, y: 35 },
      { id: 'Wicketkeeper', name: 'WK', x: 60, y: 35 },
      { id: 'All-rounder', name: 'AR', x: 30, y: 50 },
      { id: 'All-rounder', name: 'AR', x: 50, y: 50 },
      { id: 'All-rounder', name: 'AR', x: 70, y: 50 },
      { id: 'Bowler', name: 'Pacer', x: 30, y: 70 },
      { id: 'Bowler', name: 'Spinner', x: 50, y: 70 },
      { id: 'Bowler', name: 'Pacer', x: 70, y: 70 }
    ]
  }
];

// New data for Predictions page
export const upcomingMatches = [
  {
    id: 1,
    league: 'EPL',
    date: 'Tomorrow, 19:45',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeForm: 'Good',
    awayForm: 'Average',
    prediction: {
      winner: 'Arsenal',
      homeWinProb: 60,
      drawProb: 25,
      awayWinProb: 15,
      confidence: 82
    }
  },
  {
    id: 2,
    league: 'EPL',
    date: 'Sunday, 16:30',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    homeForm: 'Good',
    awayForm: 'Good',
    prediction: {
      winner: 'Draw',
      homeWinProb: 35,
      drawProb: 40,
      awayWinProb: 25,
      confidence: 65
    }
  },
  {
    id: 3,
    league: 'PSL',
    date: 'Tomorrow, 14:00',
    homeTeam: 'Karachi Kings',
    awayTeam: 'Multan Sultans',
    homeForm: 'Average',
    awayForm: 'Good',
    prediction: {
      winner: 'Multan Sultans',
      homeWinProb: 30,
      drawProb: 10,
      awayWinProb: 60,
      confidence: 78
    }
  },
  {
    id: 4,
    league: 'PSL',
    date: 'Saturday, 19:00',
    homeTeam: 'Lahore Qalandars',
    awayTeam: 'Islamabad United',
    homeForm: 'Good',
    awayForm: 'Poor',
    prediction: {
      winner: 'Lahore Qalandars',
      homeWinProb: 70,
      drawProb: 20,
      awayWinProb: 10,
      confidence: 85
    }
  }
];

// New data for Teams page
export const teams = [
  {
    id: 1,
    name: 'Arsenal',
    league: 'EPL',
    position: 1,
    form: 'WWDLW',
    rating: 8.5,
    lastResult: 'Win',
    squadSize: 25
  },
  {
    id: 2,
    name: 'Liverpool',
    league: 'EPL',
    position: 2,
    form: 'WDWWL',
    rating: 8.3,
    lastResult: 'Loss',
    squadSize: 26
  },
  {
    id: 3,
    name: 'Man City',
    league: 'EPL',
    position: 3,
    form: 'WWWLD',
    rating: 8.7,
    lastResult: 'Draw',
    squadSize: 24
  },
  {
    id: 4,
    name: 'Chelsea',
    league: 'EPL',
    position: 4,
    form: 'DWWDL',
    rating: 7.9,
    lastResult: 'Win',
    squadSize: 28
  },
  {
    id: 5,
    name: 'Karachi Kings',
    league: 'PSL',
    position: 1,
    form: 'WWLWD',
    rating: 8.1,
    lastResult: 'Win',
    squadSize: 18
  },
  {
    id: 6,
    name: 'Lahore Qalandars',
    league: 'PSL',
    position: 2,
    form: 'WLWLW',
    rating: 8.0,
    lastResult: 'Win',
    squadSize: 17
  },
  {
    id: 7,
    name: 'Multan Sultans',
    league: 'PSL',
    position: 3,
    form: 'LWWWD',
    rating: 7.8,
    lastResult: 'Draw',
    squadSize: 18
  },
  {
    id: 8,
    name: 'Islamabad United',
    league: 'PSL',
    position: 4,
    form: 'LLWWL',
    rating: 7.5,
    lastResult: 'Loss',
    squadSize: 19
  }
];

// League data
export const leagues = [
  {
    id: 1,
    name: 'English Premier League',
    shortName: 'EPL',
    country: 'England',
    logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    teams: 20,
    currentSeason: '2023/24',
    type: 'football',
    popularity: 95,
    description: 'The Premier League is the top tier of English football, featuring 20 teams competing for the championship.',
    startDate: '2023-08-11',
    endDate: '2024-05-19',
    matchesPlayed: 26,
    topScorer: 'Erling Haaland',
    recentForm: 'High scoring, competitive matches in recent weeks',
    predictionAccuracy: 76,
    standings: [
      { position: 1, team: 'Arsenal', played: 26, won: 19, drawn: 4, lost: 3, points: 61 },
      { position: 2, team: 'Liverpool', played: 26, won: 18, drawn: 6, lost: 2, points: 60 },
      { position: 3, team: 'Man City', played: 26, won: 18, drawn: 5, lost: 3, points: 59 },
      { position: 4, team: 'Chelsea', played: 26, won: 13, drawn: 6, lost: 7, points: 45 }
    ]
  },
  {
    id: 2,
    name: 'Pakistan Super League',
    shortName: 'PSL',
    country: 'Pakistan',
    logo: '🇵🇰',
    teams: 6,
    currentSeason: '2023/24',
    type: 'cricket',
    popularity: 82,
    description: 'The Pakistan Super League is a professional Twenty20 cricket league contested by six teams representing cities in Pakistan.',
    startDate: '2024-02-17',
    endDate: '2024-03-18',
    matchesPlayed: 14,
    topScorer: 'Babar Azam',
    recentForm: 'High run-scoring matches with close finishes',
    predictionAccuracy: 72,
    standings: [
      { position: 1, team: 'Karachi Kings', played: 7, won: 5, lost: 2, points: 10 },
      { position: 2, team: 'Lahore Qalandars', played: 7, won: 4, lost: 3, points: 8 },
      { position: 3, team: 'Multan Sultans', played: 7, won: 4, lost: 3, points: 8 },
      { position: 4, team: 'Islamabad United', played: 7, won: 3, lost: 4, points: 6 }
    ]
  },
  {
    id: 3,
    name: 'La Liga',
    shortName: 'La Liga',
    country: 'Spain',
    logo: '🇪🇸',
    teams: 20,
    currentSeason: '2023/24',
    type: 'football',
    popularity: 90,
    description: 'La Liga is the top professional football division of the Spanish football league system.',
    startDate: '2023-08-11',
    endDate: '2024-05-26',
    matchesPlayed: 26,
    topScorer: 'Robert Lewandowski',
    recentForm: 'Tactical matches with strong defensive performances',
    predictionAccuracy: 74,
    standings: [
      { position: 1, team: 'Real Madrid', played: 26, won: 20, drawn: 5, lost: 1, points: 65 },
      { position: 2, team: 'Barcelona', played: 26, won: 17, drawn: 5, lost: 4, points: 56 },
      { position: 3, team: 'Atlético Madrid', played: 26, won: 16, drawn: 3, lost: 7, points: 51 },
      { position: 4, team: 'Girona', played: 26, won: 15, drawn: 5, lost: 6, points: 50 }
    ]
  },
  {
    id: 4,
    name: 'Indian Premier League',
    shortName: 'IPL',
    country: 'India',
    logo: '🇮🇳',
    teams: 10,
    currentSeason: '2024',
    type: 'cricket',
    popularity: 93,
    description: 'The Indian Premier League is a professional Twenty20 cricket league in India contested during March or April and May of every year by teams representing Indian cities.',
    startDate: '2024-03-22',
    endDate: '2024-05-26',
    matchesPlayed: 12,
    topScorer: 'Virat Kohli',
    recentForm: 'High-scoring matches with strong batting performances',
    predictionAccuracy: 68,
    standings: [
      { position: 1, team: 'Mumbai Indians', played: 6, won: 5, lost: 1, points: 10 },
      { position: 2, team: 'Royal Challengers', played: 6, won: 4, lost: 2, points: 8 },
      { position: 3, team: 'Rajasthan Royals', played: 6, won: 4, lost: 2, points: 8 },
      { position: 4, team: 'Kolkata Knight Riders', played: 6, won: 3, lost: 3, points: 6 }
    ]
  },
  {
    id: 5,
    name: 'Bundesliga',
    shortName: 'BL',
    country: 'Germany',
    logo: '🇩🇪',
    teams: 18,
    currentSeason: '2023/24',
    type: 'football',
    popularity: 85,
    description: 'The Bundesliga is a professional association football league in Germany and the football league with the highest average stadium attendance worldwide.',
    startDate: '2023-08-18',
    endDate: '2024-05-18',
    matchesPlayed: 24,
    topScorer: 'Harry Kane',
    recentForm: 'High scoring, attacking football with many goals',
    predictionAccuracy: 72,
    standings: [
      { position: 1, team: 'Bayern Munich', played: 24, won: 17, drawn: 3, lost: 4, points: 54 },
      { position: 2, team: 'Bayer Leverkusen', played: 24, won: 16, drawn: 5, lost: 3, points: 53 },
      { position: 3, team: 'RB Leipzig', played: 24, won: 14, drawn: 4, lost: 6, points: 46 },
      { position: 4, team: 'Borussia Dortmund', played: 24, won: 12, drawn: 6, lost: 6, points: 42 }
    ]
  },
  {
    id: 6,
    name: 'Big Bash League',
    shortName: 'BBL',
    country: 'Australia',
    logo: '🇦🇺',
    teams: 8,
    currentSeason: '2023/24',
    type: 'cricket',
    popularity: 78,
    description: 'The Big Bash League is an Australian professional franchise Twenty20 cricket league.',
    startDate: '2023-12-07',
    endDate: '2024-01-27',
    matchesPlayed: 56,
    topScorer: 'Glenn Maxwell',
    recentForm: 'Fast-paced matches with excellent bowling',
    predictionAccuracy: 70,
    standings: [
      { position: 1, team: 'Perth Scorchers', played: 14, won: 10, lost: 4, points: 20 },
      { position: 2, team: 'Sydney Sixers', played: 14, won: 9, lost: 5, points: 18 },
      { position: 3, team: 'Brisbane Heat', played: 14, won: 8, lost: 6, points: 16 },
      { position: 4, team: 'Melbourne Stars', played: 14, won: 7, lost: 7, points: 14 }
    ]
  }
];

// Schedule data for the Schedules page
export const schedules = [
  {
    id: 1,
    league: 'EPL',
    date: '2024-03-20',
    time: '19:45',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    venue: 'Emirates Stadium',
    type: 'football',
    prediction: {
      homeWin: 60,
      draw: 25,
      awayWin: 15
    },
    status: 'upcoming'
  },
  {
    id: 2,
    league: 'EPL',
    date: '2024-03-24',
    time: '16:30',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    venue: 'Anfield',
    type: 'football',
    prediction: {
      homeWin: 35,
      draw: 40,
      awayWin: 25
    },
    status: 'upcoming'
  },
  {
    id: 3,
    league: 'PSL',
    date: '2024-03-20',
    time: '14:00',
    homeTeam: 'Karachi Kings',
    awayTeam: 'Multan Sultans',
    venue: 'National Stadium',
    type: 'cricket',
    prediction: {
      homeWin: 30,
      draw: 0,
      awayWin: 70
    },
    status: 'upcoming'
  },
  {
    id: 4,
    league: 'PSL',
    date: '2024-03-23',
    time: '19:00',
    homeTeam: 'Lahore Qalandars',
    awayTeam: 'Islamabad United',
    venue: 'Gaddafi Stadium',
    type: 'cricket',
    prediction: {
      homeWin: 70,
      draw: 0,
      awayWin: 30
    },
    status: 'upcoming'
  },
  {
    id: 5,
    league: 'La Liga',
    date: '2024-03-21',
    time: '20:00',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    venue: 'Camp Nou',
    type: 'football',
    prediction: {
      homeWin: 45,
      draw: 30,
      awayWin: 25
    },
    status: 'upcoming'
  },
  {
    id: 6,
    league: 'IPL',
    date: '2024-03-22',
    time: '15:30',
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Royal Challengers',
    venue: 'Wankhede Stadium',
    type: 'cricket',
    prediction: {
      homeWin: 55,
      draw: 0,
      awayWin: 45
    },
    status: 'upcoming'
  },
  {
    id: 7,
    league: 'EPL',
    date: '2024-03-16',
    time: '15:00',
    homeTeam: 'Man United',
    awayTeam: 'Tottenham',
    venue: 'Old Trafford',
    type: 'football',
    result: {
      homeScore: 2,
      awayScore: 2
    },
    status: 'completed'
  },
  {
    id: 8,
    league: 'PSL',
    date: '2024-03-17',
    time: '19:00',
    homeTeam: 'Islamabad United',
    awayTeam: 'Karachi Kings',
    venue: 'Rawalpindi Cricket Stadium',
    type: 'cricket',
    result: {
      homeScore: 180,
      awayScore: 162
    },
    status: 'completed'
  }
];
