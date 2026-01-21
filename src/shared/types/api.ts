export interface UseMutationCallback {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }

  export interface ValidationErrorResponse {
    [key: string]: string[];
  }