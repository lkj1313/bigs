import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import type { UseMutationCallback } from "@/shared/types";
import type { CreateBoardRequest } from "@/entities/board";
import { updateBoard } from "../api/update-board";

export function useUpdateBoard(postId: number, callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, file }: { request: CreateBoardRequest; file?: File }) =>
      updateBoard(postId, request, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.board.lists(), refetchType: "all" });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.board.detail(postId) });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },

    onError: (error: Error) => {
      console.error("게시글 수정 에러:", error);
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}

