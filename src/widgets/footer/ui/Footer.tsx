export const Footer = () => {
  return (
    <footer className="border-t bg-slate-50">

      <div className="container-wide mx-auto flex flex-col gap-2 py-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © 2026 BIGS Corp. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">이용약관</a>
          <a href="#" className="hover:underline">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
};