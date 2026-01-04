/**
 * ADMIN WITHDRAWAL SERVICE
 *
 * Complete/reject withdrawals.
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

export const getAllWithdrawals = async () => {
  const response = await adminAPI.get('/withdrawals');
  return response.data;
};

export const completeWithdrawal = async (withdrawalId) => {
  const response = await adminAPI.post(`/withdrawals/${withdrawalId}/complete`);
  return response.data;
};

export const rejectWithdrawal = async (withdrawalId) => {
  const response = await adminAPI.post(`/withdrawals/${withdrawalId}/reject`);
  return response.data;
};
