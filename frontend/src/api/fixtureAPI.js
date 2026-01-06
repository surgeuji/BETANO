/**
 * Fixture API Client
 * Fetches virtual sports fixtures from backend
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getFixtures = async (count = 100) => {
  try {
    const response = await axios.get(`${API_BASE}/api/fixtures?count=${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
};

export const getFixturesByLeague = async (league) => {
  try {
    const response = await axios.get(`${API_BASE}/api/fixtures/league/${league}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fixtures for league:', error);
    throw error;
  }
};
