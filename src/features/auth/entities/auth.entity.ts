export type AuthStatus = 'hydrating' | 'authenticated' | 'anonymous';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type Citizen = {
  id: string;
  firstName: string;
  lastName: string | null;
  dni: string;
  phone: string;
  email: string | null;
  emailVerifiedAt: string | null;
  role: 'CITIZEN';
  status: string;
};

export type AuthSession = {
  tokens: AuthTokens;
  user: Citizen;
};
