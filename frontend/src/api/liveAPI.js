// Wrapper to fetch live matches from configured provider.
// Uses VITE_LIVE_API_URL and VITE_LIVE_API_KEY environment variables.
// If none configured, falls back to mock data.

const API_URL = import.meta.env.VITE_LIVE_API_URL || '';
const API_KEY = import.meta.env.VITE_LIVE_API_KEY || '';

const mockMatches = [
  { id: 1, league: 'EPL', home: 'Arsenal', away: 'Brighton', time: '14:30', odds: { '1': 1.75, 'X': 3.50, '2': 4.50 }, live: true },
  { id: 2, league: 'Serie A', home: 'Juventus', away: 'Milan', time: '16:45', odds: { '1': 2.10, 'X': 3.20, '2': 3.40 }, live: false },
  { id: 3, league: 'LaLiga', home: 'Barcelona', away: 'Real Madrid', time: '18:00', odds: { '1': 1.90, 'X': 3.30, '2': 3.80 }, live: false },
];

export const fetchLiveMatches = async (league) => {
  if (!API_URL || !API_KEY) {
    return mockMatches.filter(m => !league || m.league === league);
  }

  try {
    const url = new URL(API_URL);
    if (league) url.searchParams.set('league', league);
    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });
    if (!res.ok) {
      console.error('Live API error', res.status);
      return mockMatches.filter(m => !league || m.league === league);
    }
    const data = await res.json();
    // Expect array of matches in provider format; map to our fields if necessary
    if (Array.isArray(data)) return data;
    // try common shapes
    if (data.matches) return data.matches;
    return mockMatches.filter(m => !league || m.league === league);
  } catch (err) {
    console.error('fetchLiveMatches error', err);
    return mockMatches.filter(m => !league || m.league === league);
  }
};

export default { fetchLiveMatches };
