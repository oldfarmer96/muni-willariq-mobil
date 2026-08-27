import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/contracts/auth.contracts';
import type { Citizen } from '@/features/auth/entities/auth.entity';
import { api } from '@/infrastructure/http/api-client';

export const authService = {
  async login(input: LoginRequest) {
    const response = await api.post<LoginResponse>('/auth/mobile/login', input);
    return response.data;
  },
  async register(input: RegisterRequest) {
    const response = await api.post<RegisterResponse>('/auth/register', input);
    return response.data;
  },
  async me() {
    const response = await api.get<Citizen>('/users/me');
    return response.data;
  },
  async logout(input: LogoutRequest) {
    await api.post('/auth/mobile/logout', input);
  },
};
