"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface MobileShellProps {
  children: React.ReactNode;
  onHome?: () => void;
}

export default function MobileShell({ children, onHome }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-stone-100 flex items-start justify-center">
      <div className="relative w-full max-w-107.5 min-h-screen bg-white shadow-2xl flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-5 py-3 flex items-center justify-between">
          <button
            onClick={onHome}
            className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-200"
          >
            Banila Co
          </button>
          <LanguageSwitcher />
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
