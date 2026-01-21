export const QUERY_KEYS = {
    
    board: {
      all: ["board"],
      lists: () => [...QUERY_KEYS.board.all, "list"],
      list: (filters?: object) => [...QUERY_KEYS.board.lists(), { ...filters }],
      details: () => [...QUERY_KEYS.board.all, "detail"],
      detail: (id: number) => [...QUERY_KEYS.board.details(), id],
      categories: () => [...QUERY_KEYS.board.all, "categories"],
    },
  };
  
 

  
  export const BUCKET_NAME = "uploads";