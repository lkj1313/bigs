import { AxiosError } from "axios";
import type { ValidationErrorResponse } from "@/shared/types/api";

export const getErrorMessage = (error: unknown): string | undefined => {
  const defaultMessage = "알 수 없는 오류가 발생했습니다.";

  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ValidationErrorResponse;

    if (errorData) {
      const fields = Object.keys(errorData);
      if (fields.length > 0) {
        const firstField = fields[0];
        const messages = errorData[firstField];
        if (Array.isArray(messages) && messages.length > 0) {
          return messages[0];
        }
      }
      const message = (errorData as ValidationErrorResponse).message;
      if (typeof message === "string") {
        return message;
      }
    }
  } 
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}