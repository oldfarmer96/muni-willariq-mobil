import { useMutation } from '@tanstack/react-query';

import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { toApiError } from '@/infrastructure/http/api-error';
import { tokenStorage } from '../../../infrastructure/storage/token-storage';

export function useLoginMutation() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (session) => {
      await tokenStorage.setTokens(session.tokens);
      setAuthenticated(session.user);
    },
    throwOnError: false,
    meta: { errorMap: toApiError },
  });
}
