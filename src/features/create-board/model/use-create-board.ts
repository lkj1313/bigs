import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import type { UseMutationCallback } from "@/shared/types";
import type { CreateBoardRequest } from "@/entities/board";
import { createBoard } from "../api/create-board";

export function useCreateBoard(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, file }: { request: CreateBoardRequest; file?: File }) =>
      createBoard(request, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.board.lists(),
        refetchType: "all",
      });
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },

    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}

