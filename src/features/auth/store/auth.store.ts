import { create } from 'zustand';

import type { AuthStatus, Citizen } from '@/features/auth/entities/auth.entity';

type AuthState = {
  status: AuthStatus;
  user: Citizen | null;
  setAuthenticated: (user: Citizen) => void;
  setAnonymous: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'hydrating',
  user: null,
  setAuthenticated: (user) => set({ status: 'authenticated', user }),
  setAnonymous: () => set({ status: 'anonymous', user: null }),
}));
