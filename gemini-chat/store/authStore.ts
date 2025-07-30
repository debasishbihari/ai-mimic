import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      phone: '',
      isAuthenticated: false,
      setPhone: (phone) => set({ phone }),
      login: () => set({ isAuthenticated: true }),
    }),
    { name: 'auth' }
  )
);
