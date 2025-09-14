import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { isAdminLoggedIn } = useAuth();
  return isAdminLoggedIn ? <Component /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;