import React, { createContext, useContext, useCallback } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
