import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail, useUpdateBoard, BoardForm } from "@/features/board";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib";
import { FullScreenLoader } from "@/shared/ui";

export const BoardEditPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const id = Number(postId);

  const { data: post, isLoading } = usePostDetail(id);

  const { mutate, isPending } = useUpdateBoard(id, {
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다.");
      navigate(`/boards/${id}`);
    },
    onError: (error) => toast.error("수정 실패: " + getErrorMessage(error)),
  });

  if (isLoading)
    return <FullScreenLoader message="게시글 정보를 불러오는 중입니다..." />;
  if (isPending)
    return <FullScreenLoader message="게시글을 수정하는 중입니다..." />;
  return (
    <div className="container">
      <BoardForm
        isEdit
        isPending={isPending}
        onSubmit={(data) => mutate({ request: data, file: data.file?.[0] })}
        initialValues={{
          category: post?.category ?? "",
          title: post?.title || "",
          content: post?.content || "",
        }}
      />
    </div>
  );
};
