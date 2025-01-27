import { LoginDto } from "@/types/auth/login.dto";
import apiInstance from "../axiosInstance";
import { ApiErrorResponse, ApiResponse, isApiError } from "@/types/api-response";
import { LoginResponse } from "@/types/auth/login-response.dto";

export class AuthService {
  async login(loginData: LoginDto) {
    try {
      const response = await apiInstance.post<
        ApiResponse<{ authenticate: LoginResponse }>
      >("/auth/login", loginData);

      if (isApiError(response.data)) {
        throw response.data;
      }

      return response.data.data;
    } catch (error: any) {
      if (isApiError(error)) {
        throw error;
      }
      
      // Si es un error de axios, intentamos extraer la respuesta de error
      if (error.response?.data && isApiError(error.response.data)) {
        throw error.response.data;
      }

      // Para cualquier otro tipo de error, creamos un ApiErrorResponse
      throw {
        status: "error",
        message: "Error en el sistema",
        data: null,
        error: error.message || "Error desconocido",
        statusCode: 500
      } as ApiErrorResponse;
    }
  }
}
