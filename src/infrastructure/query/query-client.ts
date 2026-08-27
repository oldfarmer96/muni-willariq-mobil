import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/infrastructure/http/api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status >= 400 && error.status < 500) && failureCount < 2,
      staleTime: 60_000,
    },
    mutations: { retry: false },
  },
});
