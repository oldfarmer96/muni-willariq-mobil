import type { AuthSession, AuthTokens, Citizen } from '@/features/auth/entities/auth.entity';

export type LoginRequest = {
  dni: string;
  password: string;
};

export type LoginResponse = AuthSession;

export type RegisterRequest = {
  firstName: string;
  lastName?: string;
  dni: string;
  phone: string;
  password: string;
};

export type RegisterResponse = Citizen;

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = AuthTokens;

export type LogoutRequest = RefreshRequest;
