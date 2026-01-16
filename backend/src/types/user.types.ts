import { Role } from '@prisma/client'

export interface RegisterUserDTO {
    email: string;
    password: string;
    role: Role;
    first_name: string;
    last_name: string;
    phone: string;
    rut: string;
}

export interface LoginUserDTO {
    email: string;
    password: string;
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

export interface ChangeEmailDTO {
  new_email: string;
  password: string;
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
    created_at: Date;
    updated_at: Date;
}

export interface AuthResponse {
    user: UserResponse;
    token: string;
}

export interface ForgotPasswordDTO{
    email: string
}

export interface ResetPasswordDTO{
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AuthMessageResponse{
    success: boolean;
    message: string;
}