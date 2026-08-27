import { useMutation } from '@tanstack/react-query';

import { authService } from '@/features/auth/services/auth.service';

export function useRegisterMutation() {
  return useMutation({ mutationFn: authService.register, retry: false });
}
