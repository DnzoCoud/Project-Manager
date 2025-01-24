import { LoginDto } from "@/types/auth/login.dto";
import apiInstance from "../axiosInstance";
import { ApiResponse } from "@/types/api-response";
import { LoginResponse } from "@/types/auth/login-response.dto";

export class AuthService {
  async login(loginData: LoginDto) {
    try {
      const response = await apiInstance.post<
        ApiResponse<{ authenticate: LoginResponse }>
      >("/auth/login", loginData);

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}
