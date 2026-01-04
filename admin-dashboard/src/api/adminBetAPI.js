/**
 * ADMIN BET SERVICE
 *
 * Settle bets.
 * Only OPERATIONS_ADMIN and SUPER_ADMIN can access.
 */

import axios from 'axios';
import { getAdminToken } from './adminAuthAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
});

adminAPI.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllBets = async () => {
  const response = await adminAPI.get('/bets');
  return response.data;
};

export const settleBet = async (betId, won, winnings) => {
  const response = await adminAPI.post(`/bets/${betId}/settle`, { won, winnings });
  return response.data;
};
