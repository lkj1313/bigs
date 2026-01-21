import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "@/entities/session";
export const GuestLayout = () => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (

    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">BIGS BOARD</h1>
        <p className="text-muted-foreground mt-2">서비스 이용을 위해 로그인해주세요.</p>
      </div>


      <main className="w-full max-w-md">
        <Outlet />
      </main>



    </div>
  );
};