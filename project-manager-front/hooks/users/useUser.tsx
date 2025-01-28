import { UserService } from "@/services/users/users.service";
import { useUserStore } from "@/stores/user.store";
import { ApiErrorResponse } from "@/types/api-response";
import { CreateUserDto } from "@/types/users/create-user.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const { setUsers, addUser, setRoles } = useUserStore();
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
  const getAllRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllRoles();
      if (data) {
        setRoles(data.roles);
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

  const createUser = async (createUserDto: CreateUserDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.storeUser(createUserDto);
      if (data) {
        addUser(data.user);
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
    createUser,
    getAllRoles,
  };
};
