import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import { getBoardCategories } from "../api/get-board-categories";

export function useBoardCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.board.categories(),
    queryFn: getBoardCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

