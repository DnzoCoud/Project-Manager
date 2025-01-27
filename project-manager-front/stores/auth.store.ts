import { API_CONSTANTS } from "@/constants/api.constants";
import { LoginResponse } from "@/types/auth/login-response.dto";
import { UserDto } from "@/types/users/user.dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface AuthState {
  authUser: UserDto | null;
  setAuthData: (authData: LoginResponse) => void;
  clearAuthData: VoidFunction;
  getFullName: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      authUser: null,
      setAuthData: (authData) => {
        set({
          authUser: authData.user,
        });
        localStorage.setItem(
          API_CONSTANTS.LOCAL_TOKEN_NAME,
          authData.accessToken
        );
      },
      clearAuthData: () => {
        set({ authUser: null });
        localStorage.removeItem(API_CONSTANTS.LOCAL_TOKEN_NAME);
      },
      getFullName: () => {
        const user = get().authUser;
        if (!user) return "";
        return `${user.firstName} ${user.lastName}`;
      },
    }),
    {
      name: "auth-storage", // Nombre de almacenamiento
    }
  )
);
