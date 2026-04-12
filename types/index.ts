export type Language = "ko" | "en" | "de" | "fr";

export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "not_sure";

export type MainConcern =
  | "pore_care"
  | "hydration"
  | "calming"
  | "brightening"
  | "firming"
  | "simple_cleanse";

export type FinishPreference = "fresh_light" | "soft_balanced" | "rich_nourishing";

export type AllergyConcern =
  | "none"
  | "fragrance"
  | "essential_oils"
  | "botanical_extracts"
  | "not_sure";

export interface QuizAnswers {
  skinType: SkinType | null;
  concern: MainConcern | null;
  allergy: AllergyConcern | null;
}

export type ProductId =
  | "original"
  | "nourishing"
  | "pore_clarifying"
  | "calming"
  | "brightening"
  | "revitalizing"
  | "firming"
  | "foam_cleanser";

export interface Product {
  id: ProductId;
  name: string;
  shortDescription: string;
  reason: string;
  image: string;
  href: string;
  category: string;
}

export interface RecommendationResult {
  primary: ProductId;
  secondary: ProductId;
}
