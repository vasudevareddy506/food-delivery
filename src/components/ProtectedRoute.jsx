import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Logged in but wrong role, redirect to appropriate dashboard or home
    return <Navigate to={user.role === 'customer' ? '/customer-dashboard' : '/restaurant-dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
