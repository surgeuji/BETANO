import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/authAPI';

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
