import { useContext } from 'react';
import { AuthProvider } from '../contexts/AuthProvider'; // Adjust path as necessary

export const useAuth = () => {
  return useContext(AuthProvider);
};
