/**
 * FRONTEND WITHDRAWAL SERVICE
 *
 * User requests withdrawal.
 * Admin verifies bets.
 * Admin pays externally.
 * Admin marks COMPLETED manually.
 */

import axios from 'axios';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const withdrawalAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/withdrawals`,
});

withdrawalAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createWithdrawal = async (amount) => {
  const response = await withdrawalAPI.post('/', { amount });
  return response.data;
};

export const getWithdrawal = async (withdrawalId) => {
  const response = await withdrawalAPI.get(`/${withdrawalId}`);
  return response.data;
};

export const getUserWithdrawals = async () => {
  const response = await withdrawalAPI.get('/');
  return response.data;
};
