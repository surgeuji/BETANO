/**
 * FRONTEND AUTH SERVICE
 *
 * Frontend MUST:
 * - Never calculate balances
 * - Never assume money
 * - Never fake approvals
 * - Always reflect backend state
 */

import axios from 'axios';

// Prefer Vercel-provided env, fallback to live Render backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://betano-9i2q.onrender.com';

console.log('[authAPI] Initialized with API_BASE_URL:', API_BASE_URL);

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
});

// Request interceptor for debugging
authAPI.interceptors.request.use((config) => {
  console.log('[authAPI] Sending request to:', config.baseURL + config.url);
  return config;
});

// Response interceptor for debugging
authAPI.interceptors.response.use((response) => {
  console.log('[authAPI] Success response:', response.status);
  return response;
}, (error) => {
  console.error('[authAPI] Error response:', error.response?.status, error.message);
  return Promise.reject(error);
});

export const register = async (email, phone, password) => {
  const response = await authAPI.post('/register', { email, phone, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await authAPI.post('/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};
