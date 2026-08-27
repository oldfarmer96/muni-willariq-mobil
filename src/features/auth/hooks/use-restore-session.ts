import { useEffect } from 'react';

import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { tokenStorage } from '../../../infrastructure/storage/token-storage';

export function useRestoreSession() {
  useEffect(() => {
    let active = true;

    async function restore() {
      try {
        const tokens = await tokenStorage.getTokens();
        if (!tokens) {
          if (active) useAuthStore.getState().setAnonymous();
          return;
        }

        const user = await authService.me();
        if (active) useAuthStore.getState().setAuthenticated(user);
      } catch {
        await tokenStorage.clearTokens();
        if (active) useAuthStore.getState().setAnonymous();
      }
    }

    void restore();
    return () => {
      active = false;
    };
  }, []);
}
