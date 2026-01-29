import { create } from 'zustand';
import type { UserResponse } from '../types/user.types';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setAuth: (user: UserResponse, token: string) => void;
  logout: () => void;
  loadAuthFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  loadAuthFromStorage: () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error al cargar usuario del storage');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  },
}));
