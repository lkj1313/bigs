import { useState } from "react";
import {
  useBoardList,
} from "@/features/board";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { FullScreenLoader } from "@/shared/ui";
import { getCategoryLabel } from "@/entities/board";
import { useBoardCategories } from "@/features/board/api/use-board";
export const BoardListPage = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading, isError } = useBoardList(page, size);
  const { data: categories } = useBoardCategories();
  if (isLoading) return <FullScreenLoader message="게시글 목록을 불러오는 중입니다..." />;
  if (isError) return <div className="p-10 text-center text-destructive">데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Button asChild>
          <Link to="/boards/create">글쓰기</Link>
        </Button>
      </div>

      {/* 게시글 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">번호</TableHead>
              <TableHead className="w-[100px] text-center">카테고리</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[150px] text-right">등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.content.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="text-center">{post.id}</TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 rounded-full bg-secondary text-[12px]">
                    {getCategoryLabel(post.category, categories)}
                  </span>
                </TableCell>
                <TableCell>
                  <Link to={`/boards/${post.id}`} className="hover:underline font-medium">
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 조작 */}
      <div className="flex items-center justify-center space-x-2 py-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={data?.first}
        >
          이전
        </Button>
        <span className="text-sm font-medium">
          {data?.number ? data.number + 1 : 1} / {data?.totalPages ? data.totalPages : 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data?.last}
        >
          다음
        </Button>
      </div>
    </div>
  );
};