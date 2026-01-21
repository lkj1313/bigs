import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import { getPostDetail } from "../api/get-post-detail";

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.board.detail(postId),
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};

