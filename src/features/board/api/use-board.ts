import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import { createBoard, getBoardList, getPostDetail, getBoardCategories, deleteBoard, updateBoard } from "@/features/board";
import type { UseMutationCallback } from "@/shared/types";
import type { CreateBoardRequest } from "@/features/board/";


// 목록 조회 훅
export const useBoardList = (page: number, size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.board.list({ page, size }),
    queryFn: () => getBoardList(page, size),
  });
};

// 상세 조회 훅
export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.board.detail(postId),
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};

// 카테고리 조회 훅
export const useCategories = () => {
  return useQuery({
    queryKey: ["board", "categories"],
    queryFn: getBoardCategories,
    staleTime: 1000 * 60 * 60, 
  });
};
export function useBoardCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.board.categories(),
    queryFn: getBoardCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useCreateBoard(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
   
    mutationFn: ({ request, file }: { request: CreateBoardRequest; file?: File }) => 
      createBoard(request, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.board.lists(),
        refetchType : 'all'
      });
      if(callbacks?.onSuccess) {
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

export function useDeleteBoard(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteBoard(postId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.board.lists() 
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

export function useUpdateBoard(postId: number, callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, file }: { request: CreateBoardRequest; file?: File }) => 
      updateBoard(postId, request, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.board.lists() });
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