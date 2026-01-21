import { baseApi } from "@/shared/api/base";

export const deleteBoard = async (postId: number): Promise<void> => {
  await baseApi.delete(`/boards/${postId}`);
};

