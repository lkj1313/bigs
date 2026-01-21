import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api/constants";
import { getBoardList } from "../api/get-board-list";

export const useBoardList = (page: number, size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.board.list({ page, size }),
    queryFn: () => getBoardList(page, size),
  });
};

