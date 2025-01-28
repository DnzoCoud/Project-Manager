import { API_CONSTANTS } from "@/constants/api.constants";
import { getCookie } from "@/lib/cookies";
import { ApiErrorResponse } from "@/types/api-response";
import axios, { AxiosError } from "axios";

const apiInstance = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = getCookie(API_CONSTANTS.LOCAL_TOKEN_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const errorResponse = error.response?.data;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      document.location.href = "/login";
    }
    const customError = new Error();
    Object.assign(customError, {
      message: errorResponse?.message || "Error desconocido",
      statusCode: errorResponse?.statusCode || 500,
      error: errorResponse?.error || "Error interno",
      data: errorResponse?.data || null,
    });

    return Promise.reject(customError);
  }
);

export default apiInstance;
