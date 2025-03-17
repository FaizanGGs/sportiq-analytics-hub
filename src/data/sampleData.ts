
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
