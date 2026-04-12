"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface MobileShellProps {
  children: React.ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="h-dvh bg-stone-100 flex items-start justify-center">
      <div className="relative w-full max-w-[430px] h-dvh bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400">
            Banila Co
          </span>
          <LanguageSwitcher />
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
