import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, create } from 'axios';

import type { RefreshResponse } from '@/features/auth/contracts/auth.contracts';
import { useAuthStore } from '@/features/auth/store/auth.store';
import type { ApiEnvelope } from '@/infrastructure/http/api-envelope';
import { tokenStorage } from '../storage/token-storage';

type RetryableRequest = InternalAxiosRequestConfig & { _retried?: boolean };

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const api: AxiosInstance = create({
  baseURL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

const refreshApi: AxiosInstance = create({
  baseURL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken() {
  const tokens = await tokenStorage.getTokens();
  if (!tokens) throw new Error('NO_REFRESH_TOKEN');

  const response = await refreshApi.post<ApiEnvelope<RefreshResponse> | RefreshResponse>(
    '/auth/mobile/refresh',
    { refreshToken: tokens.refreshToken },
  );
  const nextTokens = 'data' in response.data ? response.data.data : response.data;
  await tokenStorage.setTokens(nextTokens);
  return nextTokens.accessToken;
}

api.interceptors.request.use(async (config) => {
  if (!baseURL) throw new Error('EXPO_PUBLIC_API_URL no esta configurada.');

  const tokens = await tokenStorage.getTokens();
  if (tokens) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    const body = response.data as ApiEnvelope<unknown>;
    if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
      response.data = body.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined;

    if (error.response?.status !== 401 || !request || request._retried) {
      return Promise.reject(error);
    }

    request._retried = true;
    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });

    try {
      const accessToken = await refreshPromise;
      request.headers.Authorization = `Bearer ${accessToken}`;
      return api(request);
    } catch (refreshError) {
      await tokenStorage.clearTokens();
      useAuthStore.getState().setAnonymous();
      return Promise.reject(refreshError);
    }
  },
);
