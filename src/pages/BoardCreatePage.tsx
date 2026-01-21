import { useCreateBoard, BoardForm } from "@/features/board"; // BoardForm 불러오기
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib";
import { useNavigate } from "react-router-dom";
import { FullScreenLoader } from "@/shared/ui";

export const BoardCreatePage = () => {
    const navigate = useNavigate();

    const { mutate, isPending } = useCreateBoard({
        onSuccess: () => {
            toast.success("게시글이 등록되었습니다.");
            navigate(`/boards`);
        },
        onError: (error: Error) => {
            toast.error("등록 실패: " + getErrorMessage(error));
        }
    });

    return (
        <div className="container">
            {isPending && <FullScreenLoader message="게시글을 등록하는 중입니다..." />}
            <BoardForm
                isPending={isPending}
                onSubmit={(data) => mutate({
                    request: {
                        title: data.title,
                        content: data.content,
                        category: data.category
                    },
                    file: data.file?.[0]
                })}
            />
        </div>
    );
};