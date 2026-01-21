import { baseApi } from "@/shared/api/base";
import type { SigninFormValues } from "@/features/signin";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const signinApi = async (data: SigninFormValues): Promise<AuthResponse> => {
  const response = await baseApi.post("/auth/signin", data);
  return response.data;
};