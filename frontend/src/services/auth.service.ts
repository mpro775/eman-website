import api from './api';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ChangePasswordRequest,
  MeResponse,
} from '../types/auth.types';
import type { ApiResponse } from '../types/api.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async logout(refreshToken: string): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>('/auth/logout', { refreshToken });
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
    return response.data;
  },

  async getMe(): Promise<MeResponse> {
    const response = await api.get<MeResponse>('/auth/me');
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>('/auth/change-password', data);
    return response.data;
  },
};

