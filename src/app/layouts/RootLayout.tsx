
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { useBoardCategories } from "@/features/board/api/use-board";

export const RootLayout = () => {
  useBoardCategories();
  return (

    <div className="relative flex min-h-screen flex-col bg-background antialiased text-foreground">
      <Header />


      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};