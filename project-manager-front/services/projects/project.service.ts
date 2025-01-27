import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { ProjectDto } from "@/types/projects/project.dto";
import { CreateProjectDto } from "@/types/projects/create-project.dto";
import { CreateTaskDto } from "@/types/tasks/create-task.dto";
import { TaskDto } from "@/types/tasks/task.dto";

export class ProjectService {
  async getAll() {
    try {
      const response =
        await apiInstance.get<ApiResponse<{ projects: ProjectDto[] }>>(
          "/projects"
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

  async store(createProjectDto: CreateProjectDto) {
    try {
      const response = await apiInstance.post<
        ApiResponse<{ project: ProjectDto }>
      >("/projects", createProjectDto);
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

  async assignTaskToProject(projectId: number, createTaskDto: CreateTaskDto) {
    try {
      const response = await apiInstance.post<ApiResponse<{ task: TaskDto }>>(
        `/projects/${projectId}/tasks`,
        createTaskDto
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
