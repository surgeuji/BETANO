/**
 * Fixture Service
 * Generates virtual sports fixtures with realistic leagues and teams
 */

const leagues = [
  { name: 'Premier League', country: 'England', logo: '🇬🇧' },
  { name: 'La Liga', country: 'Spain', logo: '🇪🇸' },
  { name: 'Serie A', country: 'Italy', logo: '🇮🇹' },
  { name: 'Bundesliga', country: 'Germany', logo: '🇩🇪' },
  { name: 'Ligue 1', country: 'France', logo: '🇫🇷' },
  { name: 'Eredivisie', country: 'Netherlands', logo: '🇳🇱' },
  { name: 'Belgian Pro League', country: 'Belgium', logo: '🇧🇪' },
  { name: 'Swiss Super League', country: 'Switzerland', logo: '🇨🇭' },
  { name: 'Portuguese Primeira Liga', country: 'Portugal', logo: '🇵🇹' },
  { name: 'Russian Premier League', country: 'Russia', logo: '🇷🇺' },
  { name: 'Turkish Super Lig', country: 'Turkey', logo: '🇹🇷' },
  { name: 'Greek Super League', country: 'Greece', logo: '🇬🇷' },
  { name: 'Brazilian Série A', country: 'Brazil', logo: '🇧🇷' },
  { name: 'Argentine Primera División', country: 'Argentina', logo: '🇦🇷' },
  { name: 'Mexican Liga MX', country: 'Mexico', logo: '🇲🇽' },
  { name: 'MLS', country: 'USA', logo: '🇺🇸' },
  { name: 'J-League', country: 'Japan', logo: '🇯🇵' },
  { name: 'K-League', country: 'South Korea', logo: '🇰🇷' },
  { name: 'Australian A-League', country: 'Australia', logo: '🇦🇺' },
  { name: 'Saudi Pro League', country: 'Saudi Arabia', logo: '🇸🇦' },
  { name: 'Chinese Super League', country: 'China', logo: '🇨🇳' },
  { name: 'Indian Super League', country: 'India', logo: '🇮🇳' },
  { name: 'Egyptian Premier League', country: 'Egypt', logo: '🇪🇬' },
  { name: 'South African Premier League', country: 'South Africa', logo: '🇿🇦' },
  { name: 'Norwegian Eliteserien', country: 'Norway', logo: '🇳🇴' },
  { name: 'Swedish Allsvenskan', country: 'Sweden', logo: '🇸🇪' },
  { name: 'Danish Superliga', country: 'Denmark', logo: '🇩🇰' },
  { name: 'Czech First League', country: 'Czech Republic', logo: '🇨🇿' },
  { name: 'Polish Ekstraklasa', country: 'Poland', logo: '🇵🇱' },
  { name: 'Ukrainian Premier League', country: 'Ukraine', logo: '🇺🇦' },
  { name: 'Scottish Premiership', country: 'Scotland', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { name: 'Irish Premier Division', country: 'Ireland', logo: '🇮🇪' },
  { name: 'Austrian Bundesliga', country: 'Austria', logo: '🇦🇹' },
  { name: 'Romanian Liga I', country: 'Romania', logo: '🇷🇴' },
  { name: 'Hungarian OTP Bank Liga', country: 'Hungary', logo: '🇭🇺' },
  { name: 'Israeli Premier League', country: 'Israel', logo: '🇮🇱' },
  { name: 'UAE Pro League', country: 'UAE', logo: '🇦🇪' },
  { name: 'Thai Premier League', country: 'Thailand', logo: '🇹🇭' },
  { name: 'Vietnamese V-League', country: 'Vietnam', logo: '🇻🇳' },
  { name: 'Philippine PFL', country: 'Philippines', logo: '🇵🇭' },
  { name: 'Malaysian Super League', country: 'Malaysia', logo: '🇲🇾' },
  { name: 'Singapore Premier League', country: 'Singapore', logo: '🇸🇬' },
  { name: 'Indonesian Liga 1', country: 'Indonesia', logo: '🇮🇩' },
  { name: 'Kenyan Premier League', country: 'Kenya', logo: '🇰🇪' },
  { name: 'Ghanaian Premier League', country: 'Ghana', logo: '🇬🇭' },
  { name: 'Nigerian Premiership', country: 'Nigeria', logo: '🇳🇬' },
  { name: 'Cameroonese Elite One', country: 'Cameroon', logo: '🇨🇲' },
];

const teams = {
  'Premier League': [
    'Manchester United', 'Manchester City', 'Liverpool', 'Arsenal', 'Chelsea',
    'Tottenham', 'Brighton', 'Aston Villa', 'Newcastle', 'Everton',
    'Fulham', 'Brentford', 'Luton Town', 'Nottingham Forest', 'West Ham',
    'Wolverhampton', 'Crystal Palace', 'Ipswich', 'Southampton', 'Bournemouth'
  ],
  'La Liga': [
    'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Real Sociedad', 'Villarreal',
    'Getafe', 'Betis', 'Valencia', 'Real Vallecano', 'Sevilla',
    'Girona', 'Celta Vigo', 'Las Palmas', 'Alaves', 'Osasuna',
    'Mallorca', 'Leganes', 'Rayo Vallecano', 'Cadiz', 'Granada'
  ],
  'Serie A': [
    'Juventus', 'Inter Milan', 'AC Milan', 'Napoli', 'Roma',
    'Lazio', 'Atalanta', 'Fiorentina', 'Torino', 'Bologna',
    'Juventus', 'Sassuolo', 'Sampdoria', 'Parma', 'Lecce',
    'Monza', 'Frozen', 'Verona', 'Empoli', 'Salernitana'
  ],
  'Bundesliga': [
    'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Stuttgart',
    'Freiburg', 'Mainz', 'Union Berlin', 'Hoffenheim', 'Wolfsburg',
    'Eintracht Frankfurt', 'Augsburg', 'Schalke 04', 'Hertha BSC', 'Bochum',
    'Cologne', 'Werder Bremen', 'Hamburg', 'Magdeburg', 'Kaiserslautern'
  ],
  'Ligue 1': [
    'Paris Saint-Germain', 'Marseille', 'Monaco', 'Rennes', 'Lille',
    'Lyon', 'Nantes', 'Reims', 'Nice', 'Strasbourg',
    'Angers', 'Lens', 'Toulouse', 'Metz', 'Saint-Etienne',
    'Montpellier', 'Lorient', 'Brest', 'Auxerre', 'Troyes'
  ],
  'default': [
    'Team A', 'Team B', 'Team C', 'Team D', 'Team E',
    'Team F', 'Team G', 'Team H', 'Team I', 'Team J',
    'Team K', 'Team L', 'Team M', 'Team N', 'Team O',
    'Team P', 'Team Q', 'Team R', 'Team S', 'Team T'
  ]
};

class FixtureService {
  generateFixtures(count = 50) {
    const fixtures = [];
    const usedCombinations = new Set();

    for (let i = 0; i < count; i++) {
      const league = leagues[Math.floor(Math.random() * leagues.length)];
      const leagueTeams = teams[league.name] || teams.default;
      
      let team1, team2;
      let attempts = 0;
      do {
        team1 = leagueTeams[Math.floor(Math.random() * leagueTeams.length)];
        team2 = leagueTeams[Math.floor(Math.random() * leagueTeams.length)];
        attempts++;
      } while ((team1 === team2 || usedCombinations.has(`${team1}-${team2}`)) && attempts < 5);

      if (team1 === team2) continue;

      usedCombinations.add(`${team1}-${team2}`);

      const odds1 = (Math.random() * 2 + 1).toFixed(2); // 1.0 to 3.0
      const odds2 = (Math.random() * 2 + 1).toFixed(2); // 1.0 to 3.0
      const oddsX = (Math.random() * 2 + 1.5).toFixed(2); // 1.5 to 3.5

      fixtures.push({
        id: `fixture_${i + 1}`,
        league: league.name,
        country: league.country,
        team1,
        team2,
        kickoff: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        odds: {
          team1: parseFloat(odds1),
          draw: parseFloat(oddsX),
          team2: parseFloat(odds2)
        },
        status: 'SCHEDULED'
      });
    }

    return fixtures;
  }

  getAllFixtures(count = 100) {
    return this.generateFixtures(Math.min(count, 1000));
  }
}

module.exports = new FixtureService();
