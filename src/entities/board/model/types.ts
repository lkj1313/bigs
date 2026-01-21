export type BoardCategoryResponse = Record<string, string>; // { NOTICE: "공지", ... }
export type BoardCategoryKey = string;

export interface BasePost {
  id: number;
  title: string;
  createdAt: string;
}

// 리스트는 서버가 category로 주니까 그대로 category
export interface PostListItem extends BasePost {
  category: BoardCategoryKey;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BoardListResponse {
  content: PostListItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

// 상세 서버 원본은 boardCategory
export interface PostDetailResponseServer extends BasePost {
  content: string;
  boardCategory: BoardCategoryKey;
  imageUrl: string | null;
}

// 프론트는 category로 통일
export interface PostDetailResponse extends BasePost {
  content: string;
  category: BoardCategoryKey;
  imageUrl: string | null;
}

// 요청도 category로 (리스트와 통일)
export interface CreateBoardRequest {
  title: string;
  content: string;
  category: BoardCategoryKey;
}

export interface CreateBoardResponse {
  id: number;
}

export interface BoardFormValues {
  category: BoardCategoryKey;
  title: string;
  content: string;
  file?: FileList;
}

