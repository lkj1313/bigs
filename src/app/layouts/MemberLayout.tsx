import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "@/entities/session";

export const MemberLayout = () => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <main className="flex-1 w-full flex flex-col justify-center sm:justify-normal py-6">
        <Outlet />
      </main>
    </div>
  );
};