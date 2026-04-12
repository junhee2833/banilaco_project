import { AllergyConcern, Language } from "@/types";

/**
 * Returns an informational ingredient notice based on Q4 (allergy concern).
 * This is for UX transparency only — it does NOT affect product recommendations.
 * No medical claims. No safety guarantees. No diagnostic intent.
 */
export function getIngredientNotice(
  allergy: AllergyConcern | null,
  lang: Language
): string {
  if (!allergy) return "";

  const notices: Record<AllergyConcern, Record<Language, string>> = {
    none: {
      en: "No ingredient sensitivity selected.",
      ko: "선택된 성분 민감 사항이 없습니다.",
      de: "Keine Inhaltsstoffempfindlichkeit ausgewählt.",
      fr: "Aucune sensibilité aux ingrédients sélectionnée.",
    },
    fragrance: {
      en: "Please review the full ingredient list if you avoid fragrance.",
      ko: "향료를 피하시는 경우, 전체 성분 목록을 확인해 주세요.",
      de: "Bitte prüfen Sie die vollständige Zutatenliste, wenn Sie Duftstoffe meiden.",
      fr: "Veuillez consulter la liste complète des ingrédients si vous évitez les parfums.",
    },
    essential_oils: {
      en: "Please review the full ingredient list if you are sensitive to essential oils.",
      ko: "에센셜 오일에 민감하신 경우, 전체 성분 목록을 확인해 주세요.",
      de: "Bitte prüfen Sie die vollständige Zutatenliste, wenn Sie empfindlich auf ätherische Öle reagieren.",
      fr: "Veuillez consulter la liste complète des ingrédients si vous êtes sensible aux huiles essentielles.",
    },
    botanical_extracts: {
      en: "Please review the full ingredient list if you avoid botanical extracts.",
      ko: "식물성 추출물을 피하시는 경우, 전체 성분 목록을 확인해 주세요.",
      de: "Bitte prüfen Sie die vollständige Zutatenliste, wenn Sie pflanzliche Extrakte meiden.",
      fr: "Veuillez consulter la liste complète des ingrédients si vous évitez les extraits botaniques.",
    },
    not_sure: {
      en: "If you have allergy concerns, please review the full ingredient list before purchase.",
      ko: "알레르기 우려가 있으시면, 구매 전 전체 성분 목록을 확인해 주세요.",
      de: "Wenn Sie Allergiebedenken haben, überprüfen Sie bitte vor dem Kauf die vollständige Zutatenliste.",
      fr: "Si vous avez des inquiétudes concernant les allergies, veuillez consulter la liste complète des ingrédients avant l'achat.",
    },
  };

  return notices[allergy]?.[lang] ?? "";
}
