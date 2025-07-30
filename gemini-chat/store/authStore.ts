
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  phone: string;
  isAuthenticated: boolean;
  setPhone: (phone: string) => void;
  login: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phone: '',
      isAuthenticated: false,
      setPhone: (phone: string) => set({ phone }),
      login: () => set({ isAuthenticated: true }),
    }),
    { name: 'auth' }
  )
);
