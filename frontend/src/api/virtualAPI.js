/**
 * Virtual Games API
 * Frontend service for virtual game interactions
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const virtualAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/virtual`,
});

// Add auth token to requests
virtualAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all virtual games
export const getAllVirtualGames = async () => {
  const response = await virtualAPI.get('/games');
  return response.data;
};

// Get active virtual games
export const getActiveVirtualGames = async () => {
  const response = await virtualAPI.get('/games/active');
  return response.data;
};

// Get specific virtual game
export const getVirtualGame = async (gameId) => {
  const response = await virtualAPI.get(`/games/${gameId}`);
  return response.data;
};

// Get bets on a virtual game
export const getGameBets = async (gameId) => {
  const response = await virtualAPI.get(`/games/${gameId}/bets`);
  return response.data;
};

// Place bet on virtual game (uses bet API)
export const placeBetOnVirtualGame = async (gameId, marketType, selection, odd, stake) => {
  // This will be called through the bet API
  const betAPI = axios.create({
    baseURL: `${API_BASE_URL}/api/bets`,
  });
  
  const token = localStorage.getItem('token');
  if (token) {
    betAPI.defaults.headers.Authorization = `Bearer ${token}`;
  }

  const response = await betAPI.post('/', {
    gameId,
    marketType,
    selection,
    odd,
    stake,
    betType: 'VIRTUAL'
  });
  
  return response.data;
};

export default virtualAPI;
