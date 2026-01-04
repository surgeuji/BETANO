/**
 * ADMIN AUTH SERVICE
 *
 * Admin login with role-based access.
 * Only certain roles can see certain pages.
 * UI hides unauthorized pages completely.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
});

export const adminLogin = async (email, password) => {
  const response = await adminAPI.post('/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminRole', response.data.user.role);
  }
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
};

export const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

export const getAdminRole = () => {
  return localStorage.getItem('adminRole');
};

export const isAdminAuthenticated = () => {
  return !!getAdminToken();
};

export const canAccessPage = (requiredRoles) => {
  const role = getAdminRole();
  return requiredRoles.includes(role);
};
