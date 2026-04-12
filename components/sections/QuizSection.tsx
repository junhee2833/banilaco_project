"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";
import {
  QuizAnswers,
  SkinType,
  MainConcern,
  AllergyConcern,
} from "@/types";

interface QuizSectionProps {
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
}

type Step = 1 | 2 | 3;

const TOTAL_STEPS = 3;

export default function QuizSection({ onComplete, onBack }: QuizSectionProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinType: null,
    concern: null,
    allergy: null,
  });

  const progress = (step / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => (s + 1) as Step);
    } else {
      localStorage.setItem("banilaco_answers", JSON.stringify(answers));
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((s) => (s - 1) as Step);
    }
  };

  const isCurrentAnswered = () => {
    if (step === 1) return answers.skinType !== null;
    if (step === 2) return answers.concern !== null;
    if (step === 3) return answers.allergy !== null;
    return false;
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-stone-400 tracking-wide">
            {t.quiz_step} {step} {t.quiz_of} {TOTAL_STEPS}
          </span>
          <span className="text-xs text-stone-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-700 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 px-5 pt-8 pb-6 overflow-y-auto">
        {step === 1 && (
          <Question
            title={t.q1_title}
            options={[
              { value: "oily", label: t.q1_oily },
              { value: "dry", label: t.q1_dry },
              { value: "combination", label: t.q1_combination },
              { value: "sensitive", label: t.q1_sensitive },
              { value: "not_sure", label: t.q1_not_sure },
            ]}
            selected={answers.skinType}
            onSelect={(val) =>
              setAnswers((a) => ({ ...a, skinType: val as SkinType }))
            }
          />
        )}

        {step === 2 && (
          <Question
            title={t.q2_title}
            options={[
              { value: "pore_care", label: t.q2_pore_care },
              { value: "hydration", label: t.q2_hydration },
              { value: "calming", label: t.q2_calming },
              { value: "brightening", label: t.q2_brightening },
              { value: "firming", label: t.q2_firming },
              { value: "simple_cleanse", label: t.q2_simple_cleanse },
            ]}
            selected={answers.concern}
            onSelect={(val) =>
              setAnswers((a) => ({ ...a, concern: val as MainConcern }))
            }
          />
        )}

        {step === 3 && (
          <Question
            title={t.q4_title}
            options={[
              { value: "none", label: t.q4_none },
              { value: "fragrance", label: t.q4_fragrance },
              { value: "essential_oils", label: t.q4_essential_oils },
              { value: "botanical_extracts", label: t.q4_botanical_extracts },
              { value: "not_sure", label: t.q4_not_sure },
            ]}
            selected={answers.allergy}
            onSelect={(val) =>
              setAnswers((a) => ({ ...a, allergy: val as AllergyConcern }))
            }
          />
        )}
      </div>

      {/* Bottom nav */}
      <div className="px-5 pb-8 pt-4 border-t border-stone-50 flex gap-3">
        <button
          onClick={handleBack}
          className="flex-none px-5 py-3.5 rounded-xl border border-stone-200 text-sm text-stone-500 hover:bg-stone-50 active:scale-[0.98] transition-all duration-200"
        >
          {t.quiz_back}
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentAnswered()}
          className={`flex-1 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98] ${
            isCurrentAnswered()
              ? "bg-stone-800 text-white hover:bg-stone-700 shadow-md"
              : "bg-stone-100 text-stone-300 cursor-not-allowed"
          }`}
        >
          {step === TOTAL_STEPS ? t.quiz_see_results : t.quiz_next}
        </button>
      </div>
    </div>
  );
}

// Reusable option picker
interface QuestionProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string | null;
  onSelect: (value: string) => void;
}

function Question({ title, options, selected, onSelect }: QuestionProps) {
  return (
    <div>
      <h2 className="text-xl font-light text-stone-800 leading-snug mb-6 tracking-tight">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 active:scale-[0.98] ${
              selected === opt.value
                ? "border-stone-700 bg-stone-800 text-white shadow-md"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            <span className="text-sm font-medium">{opt.label}</span>
            {selected === opt.value && (
              <span className="ml-auto text-white opacity-80">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
