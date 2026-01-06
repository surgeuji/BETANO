/**
 * Fixtures Controller
 * Handles virtual sports fixture requests
 */

const FixtureService = require('../services/FixtureService');

exports.getFixtures = (req, res) => {
  try {
    const count = parseInt(req.query.count || 100);
    const fixtures = FixtureService.getAllFixtures(count);
    res.json(fixtures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFixturesByLeague = (req, res) => {
  try {
    const league = req.params.league;
    const allFixtures = FixtureService.getAllFixtures(1000);
    const filtered = allFixtures.filter(f => f.league.toLowerCase() === league.toLowerCase());
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
