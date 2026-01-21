import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  message?: string;
}

export const FullScreenLoader = ({
  message = "처리 중입니다..."
}: FullScreenLoaderProps) => {
  return (

    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm animate-in fade-in duration-500">


      <div className="flex flex-col items-center gap-3 p-4">
        <Loader2 size={36} className="text-primary/80 animate-spin" />

        {message && (
          <p className="text-sm font-medium text-slate-600/90">{message}</p>
        )}
      </div>
    </div>
  );
};