export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface MeResponse {
  message: string;
  data: User;
}

