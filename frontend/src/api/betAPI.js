/**
 * FRONTEND BET SERVICE
 *
 * Sports betting only.
 * Max 60 selections.
 * Backend settles, frontend shows state.
 */

import axios from 'axios';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const betAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/bets`,
});

betAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const placeBet = async (selections, stake, odds) => {
  const response = await betAPI.post('/', { selections, stake, odds });
  return response.data;
};

export const getBet = async (betId) => {
  const response = await betAPI.get(`/${betId}`);
  return response.data;
};

export const getUserBets = async () => {
  const response = await betAPI.get('/');
  return response.data;
};

export const getActiveBets = async () => {
  const response = await betAPI.get('/active/all');
  return response.data;
};
