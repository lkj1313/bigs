import { baseApi } from "@/shared/api/base";
import { type SignupFormValues } from "@/features/signup";

export const signupApi = async (data: SignupFormValues) => {
 
  const response = await baseApi.post("/auth/signup", data);
  return response.data;
};