"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types";
import en from "@/messages/en";
import ko from "@/messages/ko";
import de from "@/messages/de";
import fr from "@/messages/fr";

type Messages = typeof en;

const messageMap: Record<Language, Messages> = { en, ko, de, fr };

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Messages;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ko",
  setLang: () => {},
  t: ko,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("banilaco_lang") as Language | null;
    if (saved && ["en", "ko", "de", "fr"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("banilaco_lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: messageMap[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
