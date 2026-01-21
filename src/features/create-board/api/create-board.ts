import { baseApi } from "@/shared/api/base";
import type { CreateBoardRequest, CreateBoardResponse } from "@/entities/board";

export const createBoard = async (request: CreateBoardRequest, file?: File) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (file) {
    formData.append("file", file);
  }

  const { data } = await baseApi.post<CreateBoardResponse>("/boards", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

