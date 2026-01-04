import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../api/adminAuthAPI';

const AdminProtectedRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
