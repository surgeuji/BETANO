const express = require('express');
const router = express.Router();
const fixtureController = require('../controllers/fixture.controller');

// GET /api/fixtures?count=100
router.get('/', fixtureController.getFixtures);

// GET /api/fixtures/league/:league
router.get('/league/:league', fixtureController.getFixturesByLeague);

module.exports = router;
