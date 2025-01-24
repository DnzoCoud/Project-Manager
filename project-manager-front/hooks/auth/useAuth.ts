import { AuthService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { LoginDto } from "@/types/auth/login.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();
  const { setAuthData } = useAuthStore();

  const login = async (loginData: LoginDto) => {
    setLoading(true);
    try {
      const data = await authService.login(loginData);
      if (data) {
        setAuthData({
          accessToken: data?.authenticate.accessToken,
          user: data.authenticate.user,
        });
      }
      toast.success("My success toast");
    } catch (error) {
      toast.error("Fallo en el sistema");
    } finally {
      setLoading(false);
    }
  };
  return {
    login,
    loading,
  };
};
