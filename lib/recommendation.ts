import { QuizAnswers, RecommendationResult } from "@/types";

/**
 * Recommendation engine — uses only Q1 (skinType) and Q2 (concern).
 * Q3 (allergy) is intentionally excluded from this logic.
 */
export function getRecommendation(answers: QuizAnswers): RecommendationResult {
  const { skinType, concern } = answers;

  // Rule 1: Sensitive skin → calming
  if (skinType === "sensitive") {
    return { primary: "calming", secondary: "original" };
  }

  // Rule 2: Dry skin with hydration concern
  if (skinType === "dry" && concern === "hydration") {
    return { primary: "nourishing", secondary: "firming" };
  }

  // Rule 3: Oily / combination skin with pore care concern
  if ((skinType === "oily" || skinType === "combination") && concern === "pore_care") {
    return { primary: "pore_clarifying", secondary: "original" };
  }

  // Rule 4: Brightening concern
  if (concern === "brightening") {
    return { primary: "brightening", secondary: "original" };
  }

  // Rule 5: Firming concern
  if (concern === "firming") {
    return { primary: "firming", secondary: "revitalizing" };
  }

  // Rule 6: Unsure skin type or simple cleanse preference
  if (skinType === "not_sure" || concern === "simple_cleanse") {
    return { primary: "original", secondary: "foam_cleanser" };
  }

  // Fallback
  return { primary: "original", secondary: "foam_cleanser" };
}
