import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { TaskDto } from "@/types/tasks/task.dto";
import { UpdateTaskDto } from "@/types/tasks/update-task.dto";

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

  async updateTaskInfo(taskId: number, updateTaskDto: UpdateTaskDto) {
    try {
      const response = await apiInstance.patch<ApiResponse<{ task: TaskDto }>>(
        `/tasks/${taskId}`,
        updateTaskDto
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
