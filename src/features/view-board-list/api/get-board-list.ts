import { baseApi } from "@/shared/api/base";
import type { BoardListResponse } from "@/entities/board";

export const getBoardList = async (page = 0, size = 10) => {
  const { data } = await baseApi.get<BoardListResponse>(`/boards`, {
    params: { page, size },
  });
  return data;
};

