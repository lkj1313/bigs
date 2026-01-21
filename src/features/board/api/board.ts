import { baseApi } from "@/shared/api/base";
import type { BoardCategoryResponse, BoardListResponse, CreateBoardRequest, CreateBoardResponse, PostDetailResponse, PostDetailResponseServer  } from "@/features/board/";

// 1. 게시글 목록 조회
export const getBoardList = async (page = 0, size = 10) => {
  const { data } = await baseApi.get<BoardListResponse>(`/boards`, {
    params: { page, size },
  });
  return data;
};

// 2. 게시글 상세 조회
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



// 4. 게시글 등록
export const createBoard = async (request: CreateBoardRequest, file?: File) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (file) {
    formData.append("file", file);
  }

  const { data } = await baseApi.post<CreateBoardResponse>("/boards", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
};

// 게시글 삭제
export const deleteBoard = async (postId: number): Promise<void> => {
  await baseApi.delete(`/boards/${postId}`);
};

// 게시글 수정
export const updateBoard = async (
  postId: number, 
  request: CreateBoardRequest, 
  file?: File
) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (file) {
    formData.append("file", file);
  }

  const { data } = await baseApi.patch<CreateBoardResponse>(`/boards/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
};

  export const getBoardCategories = async () => {
    const { data } = await baseApi.get<BoardCategoryResponse>(`/boards/categories`);
    return data;
  };