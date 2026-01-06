/**
 * Booking Code API Client
 * Frontend service for interacting with booking codes
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const codesAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/codes`,
});

// Add auth token to requests
codesAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User endpoints
export const getAvailableCodes = async () => {
  const response = await codesAPI.get('/available');
  return response.data;
};

export const getCodeDetails = async (codeId) => {
  const response = await codesAPI.get(`/${codeId}`);
  return response.data;
};

export const useBookingCode = async (code) => {
  const response = await codesAPI.post('/use', { code });
  return response.data;
};

// Public: get bet by booking code (no auth required)
export const getBetByCode = async (code) => {
  const response = await axios.get(`${API_BASE_URL}/api/codes/lookup/${code}`);
  return response.data;
};

// Admin endpoints
export const createBookingCode = async (codeData) => {
  const response = await codesAPI.post('/', codeData);
  return response.data;
};

export const getAllBookingCodes = async () => {
  const response = await codesAPI.get('/admin/all');
  return response.data;
};

export const deactivateCode = async (codeId) => {
  const response = await codesAPI.patch(`/${codeId}/deactivate`);
  return response.data;
};

export const deleteBookingCode = async (codeId) => {
  const response = await codesAPI.delete(`/${codeId}`);
  return response.data;
};
