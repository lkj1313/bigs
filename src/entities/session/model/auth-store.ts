import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import type { User, UserPayload } from "@/entities/user";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  user: User | null;
  actions: {
    setTokens: (access: string, refresh: string) => void;
    clearAuth: () => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: null,

      actions: {
        setTokens: (access, refresh) => {
          try {
            const decoded = jwtDecode<UserPayload>(access);
            set({
              accessToken: access,
              refreshToken: refresh,
              isLoggedIn: true,
              user: {
                name: decoded.name,
                username: decoded.username,
              },
            });
          } catch (error) {
            console.error("토큰 해독 실패:", error);
            set({
              accessToken: access,
              refreshToken: refresh,
              isLoggedIn: true,
            });
          }
        },

        clearAuth: () => {
          set({
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
            user: null,
          });
          localStorage.removeItem("auth-storage");
        },
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);

// 1. 상태(State) 훅
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () => useAuthStore((state) => state.refreshToken);
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useUser = () => useAuthStore((state) => state.user);

// 2. 액션(Actions) 훅
export const useAuthActions = () => useAuthStore((state) => state.actions);