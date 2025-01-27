export interface ApiSuccessResponse<T> {
  status: "success" ;
  message: string;
  data: T | null;
  statusCode: number;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  data: null;
  error: string;
  statusCode: number;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Tipo guarda para verificar si es un error
export function isApiError(response: any): response is ApiErrorResponse {
  return response?.status === 'error' && 'error' in response;
}