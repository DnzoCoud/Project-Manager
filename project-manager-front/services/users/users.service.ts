import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { UserDto } from "@/types/users/user.dto";
import { CreateUserDto } from "@/types/users/create-user.dto";

export class UserService {
  async getAll() {
    try {
      const response =
        await apiInstance.get<ApiResponse<{ users: UserDto[] }>>(`/users`);
      return response.data.data;
    } catch (error: any) {
      if (isApiError(error)) {
        throw error;
      }
      if (error.response?.data && isApiError(error.response.data)) {
        throw error.response.data;
      }
      throw {
        status: "error",
        message: "Error en el sistema",
        data: null,
        error: error.message || "Error desconocido",
        statusCode: 500,
      } as ApiErrorResponse;
    }
  }

  async storeUser(createUserDto: CreateUserDto) {
    try {
      const response = await apiInstance.post<ApiResponse<{ user: UserDto }>>(
        `/users`,
        createUserDto
      );
      return response.data.data;
    } catch (error: any) {
      if (isApiError(error)) {
        throw error;
      }
      if (error.response?.data && isApiError(error.response.data)) {
        throw error.response.data;
      }
      throw {
        status: "error",
        message: "Error en el sistema",
        data: null,
        error: error.message || "Error desconocido",
        statusCode: 500,
      } as ApiErrorResponse;
    }
  }
}
