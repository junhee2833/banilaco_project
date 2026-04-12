"use client";

import { useState, useEffect } from "react";
import MobileShell from "@/components/layout/MobileShell";
import HeroSection from "@/components/sections/HeroSection";
import QuizSection from "@/components/sections/QuizSection";
import ResultSection from "@/components/sections/ResultSection";
import { getRecommendation } from "@/lib/recommendation";
import { QuizAnswers, RecommendationResult } from "@/types";

type AppSection = "hero" | "quiz" | "result";

const EMPTY_ANSWERS: QuizAnswers = {
  skinType: null,
  concern: null,
  allergy: null,
};

export default function Home() {
  const [section, setSection] = useState<AppSection>("hero");
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedResult = localStorage.getItem("banilaco_result");
    const savedAnswers = localStorage.getItem("banilaco_answers");
    if (savedResult && savedAnswers) {
      try {
        setResult(JSON.parse(savedResult));
        setAnswers(JSON.parse(savedAnswers));
        setSection("result");
      } catch {
        // If parsing fails, start fresh
      }
    }
  }, []);

  const handleStart = () => {
    setSection("quiz");
  };

  const handleQuizComplete = (quizAnswers: QuizAnswers) => {
    const recommendation = getRecommendation(quizAnswers);
    setAnswers(quizAnswers);
    setResult(recommendation);
    localStorage.setItem("banilaco_result", JSON.stringify(recommendation));
    setSection("result");
  };

  const handleRetake = () => {
    setAnswers(EMPTY_ANSWERS);
    setResult(null);
    localStorage.removeItem("banilaco_result");
    localStorage.removeItem("banilaco_answers");
    setSection("hero");
  };

  return (
    <MobileShell>
      <div
        className="flex-1 flex flex-col transition-opacity duration-300"
        key={section}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      >
        {section === "hero" && <HeroSection onStart={handleStart} />}
        {section === "quiz" && (
          <QuizSection onComplete={handleQuizComplete} onBack={handleRetake} />
        )}
        {section === "result" && result && (
          <ResultSection answers={answers} result={result} onRetake={handleRetake} />
        )}
      </div>
    </MobileShell>
  );
}
