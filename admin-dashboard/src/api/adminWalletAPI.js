/**
 * ADMIN WALLET SERVICE
 *
 * Modify user wallets.
 * Only FINANCE_ADMIN and SUPER_ADMIN can access.
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

export const updateMainBalance = async (userId, amount) => {
  const response = await adminAPI.put(`/wallets/${userId}/main-balance`, { amount });
  return response.data;
};

export const updateBonusBalance = async (userId, amount) => {
  const response = await adminAPI.put(`/wallets/${userId}/bonus-balance`, { amount });
  return response.data;
};
