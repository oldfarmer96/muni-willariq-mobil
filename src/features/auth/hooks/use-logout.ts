import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { queryClient } from '@/infrastructure/query/query-client';
import { tokenStorage } from '../../../infrastructure/storage/token-storage';

export function useLogout() {
  const setAnonymous = useAuthStore((state) => state.setAnonymous);

  return useMutation({
    mutationFn: async () => {
      const tokens = await tokenStorage.getTokens();
      try {
        if (tokens) await authService.logout({ refreshToken: tokens.refreshToken });
      } finally {
        await tokenStorage.clearTokens();
      }
    },
    onSettled: () => {
      setAnonymous();
      queryClient.clear();
      router.replace('/login');
    },
  });
}
