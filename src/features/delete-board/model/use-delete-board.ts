import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import type { UseMutationCallback } from "@/shared/types";
import { deleteBoard } from "../api/delete-board";

export function useDeleteBoard(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteBoard(postId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.board.lists(),
        refetchType: "all",
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },

    onError: (error: Error) => {
      console.error("게시글 삭제 에러:", error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}

