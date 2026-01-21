import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "@/entities/session";


export const MemberLayout = () => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-6">


      <main className="flex-1 w-full flex flex-col p-6">
        <Outlet />
      </main>
    </div>
  );
};