/**
 * ADMIN DEPOSIT SERVICE
 *
 * Approve/reject deposits.
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

export const getAllDeposits = async () => {
  const response = await adminAPI.get('/deposits');
  return response.data;
};

export const approveDeposit = async (depositId) => {
  const response = await adminAPI.post(`/deposits/${depositId}/approve`);
  return response.data;
};

export const rejectDeposit = async (depositId) => {
  const response = await adminAPI.post(`/deposits/${depositId}/reject`);
  return response.data;
};
