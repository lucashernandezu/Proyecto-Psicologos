import api from './api.service';
import type {
  LoginUserDTO,
  RegisterUserDTO,
  ApiAuthResponse,
  ApiMessageResponse,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '../types/user.types';

class AuthService {
  async login(credentials: LoginUserDTO): Promise<ApiAuthResponse> {
    const response = await api.post<ApiAuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterUserDTO): Promise<ApiAuthResponse> {
    const response = await api.post<ApiAuthResponse>('/users/register', userData);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordDTO): Promise<ApiMessageResponse> {
    const response = await api.post<ApiMessageResponse>('/auth/forgot-password', data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordDTO): Promise<ApiMessageResponse> {
    const response = await api.post<ApiMessageResponse>('/auth/reset-password', data);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

export default new AuthService();
