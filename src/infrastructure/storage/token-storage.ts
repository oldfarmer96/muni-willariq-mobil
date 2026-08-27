import * as SecureStore from 'expo-secure-store';

import type { AuthTokens } from '@/features/auth/entities/auth.entity';

const ACCESS_TOKEN_KEY = 'willariq.access-token';
const REFRESH_TOKEN_KEY = 'willariq.refresh-token';

export const tokenStorage = {
  async getTokens(): Promise<AuthTokens | null> {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
    ]);

    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  },
  async setTokens(tokens: AuthTokens) {
    await Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  },
  async clearTokens() {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};
