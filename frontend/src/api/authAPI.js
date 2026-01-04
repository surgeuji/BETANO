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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
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
