import { useParams, useNavigate } from "react-router-dom";
import { useBoardCategories, useDeleteBoard, usePostDetail } from "@/features/board";
import { Button, FullScreenLoader } from "@/shared/ui";
import { ChevronLeft, Calendar, User, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getCategoryLabel } from "@/entities/board";
export const BoardDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { mutate: deleteBoard, isPending: isDeletePending } = useDeleteBoard({
    onSuccess: () => {
      navigate("/boards");
      toast.success("게시글이 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error("삭제 실패: " + error.message);
    },
  });
  const handleDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deleteBoard(Number(postId));
    }
  };

  const { data: post, isLoading, isError } = usePostDetail(Number(postId));
  const { data: categories } = useBoardCategories();

  if (isLoading) return <FullScreenLoader message="게시글 정보를 불러오는 중입니다..." />;
  if (isDeletePending) return <FullScreenLoader message="게시글을 삭제하는 중입니다..." />;
  if (isError || !post) return <div className="py-20 text-center text-slate-400">글을 찾을 수 없습니다.</div>;

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  return (
    <div className="container  ">
      {/* 메인 컨텐츠 카드 */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-8 sm:p-16">

          {/* 카드 내부 최상단 액션 바 */}
          <div className="flex justify-between items-center mb-12 pb-6 border-b border-slate-50">
            <Button
              variant="ghost"
              onClick={() => navigate("/boards")}
              className="group gap-1 text-slate-500 hover:text-slate-900 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              목록으로
            </Button>

            <div className="flex items-center gap-2">
              <Button onClick={() => navigate(`/boards/${postId}/edit`)} variant="outline" size="sm" className="h-9 gap-1.5 text-slate-600 border-slate-200 hover:bg-slate-50">
                <Edit2 className="w-3.5 h-3.5" />
                수정
              </Button>
              <Button onClick={handleDelete} disabled={isDeletePending} variant="ghost" size="sm" className="h-9 gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5" />
                삭제
              </Button>
            </div>
          </div>

          {/* 헤더 섹션 */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-4 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full tracking-wider uppercase">
                {getCategoryLabel(post.category, categories)}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8 leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-700">작성자</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </header>

          {/* 본문 섹션 */}
          <article className="min-h-[400px] border-t border-slate-100 pt-12">
            {post.imageUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <img
                  src={`${BASE_URL}${post.imageUrl}`}
                  alt="첨부 이미지"
                  className="w-full h-auto max-h-[700px] object-contain mx-auto"
                />
              </div>
            )}

            <p className="text-xl text-slate-700 whitespace-pre-wrap leading-[1.8] tracking-normal">
              {post.content}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};