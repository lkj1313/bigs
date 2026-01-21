import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

interface AuthFormLayoutProps {
  title: string;
  children: ReactNode;
  footerText: string;
  linkText: string;
  linkTo: string;
}

export const AuthFormLayout = ({
  title,
  children,
  footerText,
  linkText,
  linkTo
}: AuthFormLayoutProps) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-slate-200/60 rounded-2xl">
      <CardHeader className="pt-8">
        <CardTitle className="text-2xl font-bold text-center text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        {children}
        <div className="text-center text-sm mt-6 text-slate-500">
          {footerText}{" "}
          <Link to={linkTo} className="text-primary hover:underline font-semibold">
            {linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};