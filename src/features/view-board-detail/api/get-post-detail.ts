import { baseApi } from "@/shared/api/base";
import type { PostDetailResponse, PostDetailResponseServer } from "@/entities/board";

export const getPostDetail = async (postId: number): Promise<PostDetailResponse> => {
  const { data } = await baseApi.get<PostDetailResponseServer>(`/boards/${postId}`);

  return {
    id: data.id,
    title: data.title,
    createdAt: data.createdAt,
    content: data.content,
    category: data.boardCategory,
    imageUrl: data.imageUrl,
  };
};

