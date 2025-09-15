import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAuth();

  // If logged in → show children, else redirect to login
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
