"use client";

import { useLanguage } from "@/lib/languageContext";
import { Language } from "@/types";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => setLang(l.code)}
            className={`text-xs px-1.5 py-0.5 rounded transition-all duration-200 ${
              lang === l.code
                ? "text-stone-800 font-semibold"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            {l.label}
          </button>
          {i < LANGUAGES.length - 1 && (
            <span className="text-stone-300 text-xs">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
