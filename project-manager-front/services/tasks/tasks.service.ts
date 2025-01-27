import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { TaskDto } from "@/types/tasks/task.dto";

export class TaskService {
  async getAllByProject(projectId: number) {
    try {
      const response = await apiInstance.get<ApiResponse<{ tasks: TaskDto[] }>>(
        `/tasks/project/${projectId}`
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
