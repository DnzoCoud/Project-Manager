import { API_CONSTANTS } from "@/constants/api.constants";
import { LoginResponse } from "@/types/auth/login-response.dto";
import { UserDto } from "@/types/users/user.dto";
import { create } from "zustand";

interface AuthState {
  authUser: UserDto | null;
  setAuthData: (authData: LoginResponse) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authUser: null,
  setAuthData: (authData) => {
    set({
      authUser: authData.user,
    });
    localStorage.setItem(API_CONSTANTS.LOCAL_TOKEN_NAME, authData.accessToken);
  },
  clearAuthData: () => {
    set({ authUser: null });
    localStorage.removeItem(API_CONSTANTS.LOCAL_TOKEN_NAME);
  },
}));
