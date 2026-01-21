import { baseApi } from "@/shared/api/base";
import type { BoardCategoryResponse } from "../model/types";

export const getBoardCategories = async () => {
  const { data } = await baseApi.get<BoardCategoryResponse>(`/boards/categories`);
  return data;
};

