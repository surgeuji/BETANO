/**
 * ADMIN CASINO SERVICE
 *
 * Set casino game outcomes.
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

export const getAllGames = async () => {
  const response = await adminAPI.get('/casino');
  return response.data;
};

export const setGameResult = async (gameId, result, payout) => {
  const response = await adminAPI.post(`/casino/${gameId}/result`, { result, payout });
  return response.data;
};
