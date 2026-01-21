import { useForm, useWatch } from "react-hook-form";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { X, Paperclip, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BoardFormValues } from "@/features/board";
import { useBoardCategories } from "@/features/board";
import { toCategoryOptions } from "@/entities/board/lib/boardCategory.utils";

interface BoardFormProps {
  initialValues?: BoardFormValues;
  onSubmit: (data: BoardFormValues) => void;
  isPending: boolean;
  isEdit?: boolean;
}

export const BoardForm = ({
  initialValues,
  onSubmit,
  isPending,
  isEdit = false,
}: BoardFormProps) => {
  const navigate = useNavigate();

  const { data: categoryMap } = useBoardCategories();
  const categoryOptions = toCategoryOptions(categoryMap);
  console.log(categoryOptions);

  const { register, handleSubmit, setValue, control } = useForm<BoardFormValues>({
    defaultValues: initialValues || {
      category: "FREE",
      title: "",
      content: "",
      file: undefined,
    },
  });

  const file = useWatch({ control, name: "file" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-8 sm:p-16">
          <div className="flex justify-between items-center mb-12 pb-6 border-b border-slate-50">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/boards")}
              className="group gap-1 text-slate-500 hover:text-slate-900 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              목록으로
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="h-9 border-slate-200 text-slate-500"
              >
                취소
              </Button>
              <Button type="submit" disabled={isPending} className="h-9 min-w-[100px] font-semibold">
                {isPending ? "저장 중..." : isEdit ? "수정하기" : "등록하기"}
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <Select
                onValueChange={(val) => setValue("category", val)}
                defaultValue={initialValues?.category || "FREE"}
              >
                <SelectTrigger className="w-fit h-9 bg-slate-50 border-slate-200 text-slate-700 font-medium px-4 rounded-full focus:ring-0">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>

                <SelectContent>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <Input
                {...register("title", { required: "제목은 필수입니다." })}
                placeholder="제목을 입력하세요"
                className="text-4xl sm:text-5xl h-auto border-none shadow-none font-bold placeholder:text-slate-200 focus-visible:ring-0 px-0 tracking-tight"
              />
            </div>

            <div className="h-px bg-slate-100" />

            <Textarea
              {...register("content", { required: "내용은 필수입니다." })}
              placeholder="어떤 이야기를 공유하고 싶으신가요?"
              className="min-h-[450px] border-none shadow-none text-xl leading-loose focus-visible:ring-0 px-0 resize-none placeholder:text-slate-200"
            />

            <div className="pt-10 border-t border-slate-50">
              <div className="flex flex-wrap items-center gap-3">
                <label>
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="h-10 px-5 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      파일 추가
                    </div>
                  </Button>
                  <input type="file" className="hidden" {...register("file")} />
                </label>

                {file && (file as unknown as FileList)[0] && (
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm animate-in fade-in zoom-in duration-200">
                    <span className="font-medium max-w-[200px] truncate">
                      {(file as unknown as FileList)[0].name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-blue-100 hover:text-blue-900 rounded-full"
                      onClick={() => setValue("file", undefined)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
