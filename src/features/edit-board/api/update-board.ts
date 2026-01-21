import { baseApi } from "@/shared/api/base";
import type { CreateBoardRequest, CreateBoardResponse } from "@/entities/board";

export const updateBoard = async (postId: number, request: CreateBoardRequest, file?: File) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (file) {
    formData.append("file", file);
  }

  const { data } = await baseApi.patch<CreateBoardResponse>(`/boards/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

