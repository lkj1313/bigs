import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
import { useAuthStore } from "@/features/authentication";

// 1. 대기열 및 요청 설정을 위한 타입 정의
interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error | null) => void;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 2. 기본 인스턴스 설정
export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// 대기열 일괄 처리 함수
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 3. 요청 인터셉터: 모든 요청에 Access Token 자동 부착
baseApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;

  const url = config.url ?? "";
  const isPublic =
    url.includes("/auth/signin") || 
    url.includes("/auth/signup") || 
    url.includes("/auth/refresh");

  // 토큰이 있고, 공개 API가 아닐 때만 Authorization 헤더 추가
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (config.headers && "Authorization" in config.headers) {
      delete config.headers.Authorization;
    }
  }

  return config;
});

// 4. 응답 인터셉터: 401 에러 시 토큰 재발급 로직
baseApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    // 401 Unauthorized 에러 발생 시 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      
      // 재발급 요청 자체가 401인 경우 (리프레시 토큰까지 만료됨)
      if (originalRequest.url?.includes("/auth/refresh")) {
        useAuthStore.getState().actions.clearAuth();
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      // 이미 재발급 프로세스가 진행 중이면 대기열에서 대기
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return baseApi(originalRequest);
            }
            return Promise.reject(error);
          })
          .catch((err) => Promise.reject(err));
      }

      // 재발급 시작
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = useAuthStore.getState().refreshToken;

        if (!currentRefreshToken) {
          throw new Error("리프레시 토큰이 없습니다.");
        }

       
        const response = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {
            refreshToken: currentRefreshToken 
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Zustand 스토어 업데이트 (새로 받은 두 토큰 모두 저장)
        useAuthStore.getState().actions.setTokens(accessToken, newRefreshToken);
        
        // 대기열에 있던 요청들에게 새 Access Token 전파
        processQueue(null, accessToken);

        // 실패했던 원래 요청의 헤더를 새 토큰으로 교체 후 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return baseApi(originalRequest);

      } catch (refreshError) {
        // 재발급 실패 시 (리프레시 토큰 만료 등) 모든 대기열 거절 및 로그아웃
        processQueue(refreshError as Error, null);
        useAuthStore.getState().actions.clearAuth();
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);