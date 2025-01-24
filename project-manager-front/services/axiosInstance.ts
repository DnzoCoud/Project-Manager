import { API_CONSTANTS } from "@/constants/api.constants";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_CONSTANTS.LOCAL_TOKEN_NAME);
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
  (error) => {
    if (error.response?.status === 401) {
      console.error("No autorizado, redirigiendo al login...");
      // Puedes redirigir al login aquí si es necesario
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
