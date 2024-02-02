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
    localStorage.setItem('authenticated', 'true');
    console.log(localStorage.getItem('authenticated'));
  };

  const logout = () => {
    setAuthenticated(false);
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
