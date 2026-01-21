import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signinApi } from "./signin";
import { useAuthActions } from "@/entities/session";
import type { UseMutationCallback } from "@/shared/types";

export function useSignin(callbacks?: UseMutationCallback) {
  const navigate = useNavigate();
  const { setTokens } = useAuthActions(); 

  return useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
     
      
      navigate("/"); 
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}