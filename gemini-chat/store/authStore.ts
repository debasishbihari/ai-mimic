import { create } from 'zustand';

interface AuthState {
  phone: string;
  isAuthenticated: boolean;
  setPhone: (phone: string) => void;
  login: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  isAuthenticated: false,
  setPhone: (phone) => set({ phone }),
  login: () => set({ isAuthenticated: true }),
}));