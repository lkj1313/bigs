import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupApi } from "./signup";
import type {  UseMutationCallback } from "@/shared/types";

export function useSignup(callbacks?: UseMutationCallback) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
     
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
      navigate("/signin");
    },

 
    onError: (error: Error) => {
     
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
      
   
    },
  });
}