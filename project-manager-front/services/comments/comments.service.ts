import {
  ApiErrorResponse,
  ApiResponse,
  isApiError,
} from "@/types/api-response";
import apiInstance from "../axiosInstance";
import { CommentDto } from "@/types/comments/comment.dto";
import { CreateCommentDto } from "@/types/comments/create-comment.dto";

export class CommentService {
  async getAllByTask(taskId: number) {
    try {
      const response = await apiInstance.get<
        ApiResponse<{ comments: CommentDto[] }>
      >(`/comments/task/${taskId}`);
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

  async storeComment(taskId: number, createCommentDto: CreateCommentDto) {
    try {
      const response = await apiInstance.post<
        ApiResponse<{ comment: CommentDto }>
      >(`/comments/task/${taskId}`, createCommentDto);
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
