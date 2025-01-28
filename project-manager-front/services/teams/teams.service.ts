import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { TeamDto } from "@/types/teams/team.dto";
import { CreateTeamDto } from "@/types/teams/create-team.dto";

export class TeamService {
  async getAll() {
    try {
      const response =
        await apiInstance.get<ApiResponse<{ teams: TeamDto[] }>>("/teams");
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
  async store(createTeamDto: CreateTeamDto) {
    try {
      const response = await apiInstance.post<ApiResponse<{ team: TeamDto }>>(
        "/teams",
        createTeamDto
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
