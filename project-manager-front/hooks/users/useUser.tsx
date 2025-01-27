import { UserService } from "@/services/users/users.service";
import { useUserStore } from "@/stores/user.store";
import { ApiErrorResponse } from "@/types/api-response";
import { useState } from "react";
import { toast } from "sonner";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const { setUsers } = useUserStore();
  const userService = new UserService();

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      if (data) {
        setUsers(data.users);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllUsers,
    loading,
    error,
  };
};
