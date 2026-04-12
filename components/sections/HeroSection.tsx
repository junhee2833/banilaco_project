"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero image — full width */}
      <div className="relative w-full overflow-hidden" style={{ height: "55vw", maxHeight: 280 }}>
        <Image
          src="/images/1st.png"
          alt="Banila Co"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-7 pt-8 pb-10">
        <h1 className="text-3xl font-light text-stone-800 leading-tight tracking-tight whitespace-pre-line mb-4">
          {t.hero_title}
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed mb-10 max-w-xs">
          {t.hero_subtitle}
        </p>

        {/* Decorative dots */}
        <div className="flex gap-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
        </div>

        <div className="mt-auto">
          <button
            onClick={onStart}
            className="w-full bg-stone-800 text-white text-sm font-medium tracking-wide py-4 rounded-2xl hover:bg-stone-700 active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            {t.hero_cta}
          </button>

          <p className="text-center text-xs text-stone-400 mt-4">
            Find the perfect product for you in just three questions.
          </p>
        </div>
      </div>
    </div>
  );
}
