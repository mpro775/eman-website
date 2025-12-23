import { create } from 'zustand';
import type { User, LoginRequest } from '../types/auth.types';
import { authService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setUser: (user: User) => void;
  clearError: () => void;
  initialize: () => void;
}

// Load from localStorage on initialization
const loadFromStorage = () => {
  if (typeof window === 'undefined') return null;
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken && !!user,
  };
};

export const useAuthStore = create<AuthState>((set, get) => {
  const stored = loadFromStorage();
  
  return {
    user: stored?.user || null,
    accessToken: stored?.accessToken || null,
    refreshToken: stored?.refreshToken || null,
    isAuthenticated: stored?.isAuthenticated || false,
    isLoading: false,
    error: null,

    initialize: () => {
      const stored = loadFromStorage();
      set({
        user: stored?.user || null,
        accessToken: stored?.accessToken || null,
        refreshToken: stored?.refreshToken || null,
        isAuthenticated: stored?.isAuthenticated || false,
      });
    },

    login: async (credentials: LoginRequest) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.login(credentials);
        const { user, accessToken, refreshToken } = response.data;

        // Save tokens to localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.';
        set({
          isLoading: false,
          error: errorMessage,
          isAuthenticated: false,
        });
        throw error;
      }
    },

    logout: async () => {
      const { refreshToken } = get();
      try {
        if (refreshToken) {
          await authService.logout(refreshToken);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        // Clear everything
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      }
    },

    refresh: async () => {
      const { refreshToken } = get();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await authService.refreshToken(refreshToken);
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        set({
          accessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        // Refresh failed, logout
        get().logout();
        throw error;
      }
    },

    setUser: (user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    },

    clearError: () => {
      set({ error: null });
    },
  };
});

