export const Footer = () => {
  return (
    <footer className="border-t bg-slate-50">

      <div className="container-wide mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <p className="text-sm text-muted-foreground">
          © 2026 BIGS Corp. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">이용약관</a>
          <a href="#" className="hover:underline">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
};