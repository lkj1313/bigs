

import type { BoardCategoryKey, BoardCategoryResponse } from "../model/types";

/**
 * key -> label 변환
 * - map이 없거나
 * - 서버에 없는 key면
 *   key 그대로 보여줌
 */
export const getCategoryLabel = (
  key: BoardCategoryKey,
  map?: BoardCategoryResponse
): string => {
  if (!map) return key;
  return map[key] ?? key;
};

/**
 * map -> Select 옵션 형태
 * - React Hook Form / Select 컴포넌트에 바로 연결
 */
export const toCategoryOptions = (map?: BoardCategoryResponse) => {
  if (!map) return [];
  return Object.entries(map).map(([key, label]) => ({
    value: key as BoardCategoryKey,
    label,
  }));
};
