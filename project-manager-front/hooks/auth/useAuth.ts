import { AuthService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { ApiErrorResponse } from "@/types/api-response";
import { LoginDto } from "@/types/auth/login.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const authService = new AuthService();
  const { setAuthData } = useAuthStore();

  const login = async (loginData: LoginDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(loginData);
      if (data) {
        setAuthData({
          accessToken: data?.authenticate.accessToken,
          user: data.authenticate.user,
        });
        toast.success(`Bienvenido ${data?.authenticate.user.firstName} 🙌`);
      }
      return true;
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    login,
    loading,
    error
  };
};
