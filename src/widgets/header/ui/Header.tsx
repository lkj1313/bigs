import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { useIsLoggedIn, useAuthActions, useUser } from "@/entities/session";
import { toast } from "sonner";
export const Header = () => {
  const { clearAuth } = useAuthActions();
  const isLoggedIn = useIsLoggedIn();
  const user = useUser();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      clearAuth();
      toast.success("로그아웃 되었습니다.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wide flex h-16 mx-auto items-center justify-between">

        <div className="flex items-center gap-2">
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-tighter text-primary">
            BIGS BOARD
          </Link>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {user && (
                <div className="flex flex-col items-end text-sm mr-1 sm:mr-2 leading-tight">
                  <span className="font-bold text-foreground">{user.name}님</span>
                  <span className="hidden sm:inline text-[11px] text-muted-foreground">{user.username}</span>
                </div>
              )}


              <Button variant="destructive" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signin">로그인</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};