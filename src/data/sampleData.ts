
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

// New data for Squad Builder
export const squadPlayers = [
  {
    id: 1,
    name: 'Mohamed Salah',
    position: 'Forward',
    team: 'Liverpool',
    price: 12.5,
    form: 'WDWWL',
    points: 85,
    selected: false
  },
  {
    id: 2,
    name: 'Kevin De Bruyne',
    position: 'Midfielder',
    team: 'Man City',
    price: 10.8,
    form: 'WWDLW',
    points: 78,
    selected: false
  },
  {
    id: 3,
    name: 'Erling Haaland',
    position: 'Forward',
    team: 'Man City',
    price: 14.2,
    form: 'WWWLW',
    points: 92,
    selected: false
  },
  {
    id: 4,
    name: 'Bukayo Saka',
    position: 'Midfielder',
    team: 'Arsenal',
    price: 9.5,
    form: 'WWDLW',
    points: 80,
    selected: false
  },
  {
    id: 5,
    name: 'Virgil van Dijk',
    position: 'Defender',
    team: 'Liverpool',
    price: 8.7,
    form: 'WDWWL',
    points: 75,
    selected: false
  },
  {
    id: 6,
    name: 'Babar Azam',
    position: 'Batsman',
    team: 'Karachi Kings',
    price: 11.2,
    form: 'WLWWD',
    points: 88,
    selected: false
  },
  {
    id: 7,
    name: 'Shaheen Afridi',
    position: 'Bowler',
    team: 'Lahore Qalandars',
    price: 9.8,
    form: 'WWLLD',
    points: 82,
    selected: false
  },
  {
    id: 8,
    name: 'Rashid Khan',
    position: 'Bowler',
    team: 'Lahore Qalandars',
    price: 10.5,
    form: 'WWLLD',
    points: 84,
    selected: false
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
