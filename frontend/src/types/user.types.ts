export const Role = {
  PATIENT: 'PATIENT',
  PSYCHOLOGIST: 'PSYCHOLOGIST',
  ADMIN: 'ADMIN'
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface RegisterUserDTO {
  email: string;
  password: string;
  role: Role;
  first_name: string;
  last_name: string;
  phone: string;
  rut: string;
}

export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface ChangePasswordDTO {
  current_password: string;
  new_password: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: Role;
  first_name: string;
  last_name: string;
  phone: string;
  rut: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: UserResponse;
    token: string;
  };
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export interface ApiUserResponse {
  success: boolean;
  data: UserResponse;
}

export interface ApiUsersResponse {
  success: boolean;
  data: UserResponse[];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}
