/**
 * FRONTEND WALLET SERVICE
 *
 * Frontend MUST:
 * - Never calculate balances
 * - Always fetch from backend
 * - Never modify without backend response
 */

import axios from 'axios';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const walletAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/wallet`,
});

walletAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getWallet = async () => {
  const response = await walletAPI.get('/');
  return response.data;
};

export const getAllWallets = async () => {
  const response = await walletAPI.get('/all');
  return response.data;
};
