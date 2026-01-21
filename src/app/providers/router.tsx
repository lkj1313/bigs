import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout, GuestLayout, MemberLayout } from "@/app/layouts";
import { SignupPage } from "@/pages/SignupPage";
import { SigninPage } from "@/pages/SigninPage";
import { BoardListPage } from "@/pages/BoardListPage";
import { BoardCreatePage } from "@/pages/BoardCreatePage";
import { BoardDetailPage } from "@/pages/BoardDetailPage";
import { BoardEditPage } from "@/pages/BoardEditPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          {
            path: "signin",
            element: <SigninPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
        ],
      },

      {
        element: <MemberLayout />,
        children: [
          {
            index: true,
            element: <BoardListPage />,
          },
          {
            path: "boards/create",
            element: <BoardCreatePage />,
          },
          {
            path: "boards/:postId",
            element: <BoardDetailPage />,
          },
          {
            path: "boards/:postId/edit",
            element: <BoardEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);