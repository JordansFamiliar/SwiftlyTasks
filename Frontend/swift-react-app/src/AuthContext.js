// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check some persisted information, like a token in localStorage
    const storedAuthStatus = localStorage.getItem('authenticated');
    setAuthenticated(storedAuthStatus === 'true');
  }, []);

  const login = () => {
    setAuthenticated(true);
    // Also persist the authentication status
    localStorage.setItem('authenticated', 'true');
  };

  const logout = () => {
    setAuthenticated(false);
    // Clear the persisted authentication status
    localStorage.removeItem('authenticated');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
