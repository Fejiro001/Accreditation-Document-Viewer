import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/user');
        setUserName(response.data.name);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user data', error);
        setIsAuthenticated(false);
      }
    };

    // Fetch user data on initial load
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userName, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};