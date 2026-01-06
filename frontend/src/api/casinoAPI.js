/**
 * FRONTEND CASINO SERVICE
 *
 * Admin controls all outcomes.
 * NO RNG without admin approval.
 * Games: Spin, Crash, Dice, Slots.
 */

import axios from 'axios';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const casinoAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/casino`,
});

casinoAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const startGame = async (gameType, stake) => {
  const response = await casinoAPI.post('/', { gameType, stake });
  return response.data;
};

export const getGame = async (gameId) => {
  const response = await casinoAPI.get(`/${gameId}`);
  return response.data;
};

export const getUserGames = async () => {
  const response = await casinoAPI.get('/user/games');
  return response.data;
};

export const getAllGames = async () => {
  const response = await casinoAPI.get('/admin/all');
  return response.data;
};

export const getPendingGames = async () => {
  const response = await casinoAPI.get('/admin/pending');
  return response.data;
};

export const settleGame = async (gameId, result, payout) => {
  const response = await casinoAPI.post(`/${gameId}/settle`, { result, payout });
  return response.data;
};

export default casinoAPI;
