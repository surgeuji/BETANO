/**
 * FRONTEND DEPOSIT SERVICE
 *
 * User sends money externally.
 * User marks deposit as PENDING.
 * Admin approves manually.
 */

import axios from 'axios';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const depositAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/deposits`,
});

depositAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createDeposit = async (amount, reference) => {
  const response = await depositAPI.post('/', { amount, reference });
  return response.data;
};

export const getDeposit = async (depositId) => {
  const response = await depositAPI.get(`/${depositId}`);
  return response.data;
};

export const getUserDeposits = async () => {
  const response = await depositAPI.get('/');
  return response.data;
};
