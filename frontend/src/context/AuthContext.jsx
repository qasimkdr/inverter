import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";  // ✅ fixed

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const { exp } = jwtDecode(token); // ✅ works now
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem("adminToken");
          setIsAdminLoggedIn(false);
        } else {
          setIsAdminLoggedIn(true);
        }
      } catch {
        localStorage.removeItem("adminToken");
        setIsAdminLoggedIn(false);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setIsAdminLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
