"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";
import { getIngredientNotice } from "@/lib/ingredientNotice";
import { PRODUCTS } from "@/constants/products";
import { QuizAnswers, RecommendationResult, Product, ProductId } from "@/types";

interface ResultSectionProps {
  answers: QuizAnswers;
  result: RecommendationResult;
  onRetake: () => void;
}

export default function ResultSection({
  answers,
  result,
  onRetake,
}: ResultSectionProps) {
  const { t, lang } = useLanguage();
  const primaryProduct = PRODUCTS[result.primary];
  const secondaryProduct = PRODUCTS[result.secondary];
  const ingredientNotice = getIngredientNotice(answers.allergy, lang);

  return (
    <div className="flex-1 flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-6">
        {/* Header */}
        <div className="px-5 pt-8 pb-6">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-2">
            {t.result_based_on}
          </p>
          <h2 className="text-2xl font-light text-stone-800 tracking-tight">
            {t.result_eyebrow}
          </h2>
        </div>

        {/* Primary recommendation */}
        <div className="px-5 mb-4">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
            {t.result_primary_label}
          </p>
          <ProductCard
            product={primaryProduct}
            productId={result.primary}
            shopLabel={t.result_shop_now}
            reasonLabel={t.result_reason_label}
            isPrimary
          />
        </div>

        {/* Ingredient notice */}
        {ingredientNotice && (
          <div className="mx-5 mb-4 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-600 uppercase tracking-wider mb-1 font-medium">
              {t.result_ingredient_notice_label}
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">{ingredientNotice}</p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 px-5 my-2">
          <div className="flex-1 h-px bg-stone-100" />
          <span className="text-xs text-stone-300 tracking-wider">or</span>
          <div className="flex-1 h-px bg-stone-100" />
        </div>

        {/* Secondary recommendation */}
        <div className="px-5 mb-6">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
            {t.result_secondary_label}
          </p>
          <ProductCard
            product={secondaryProduct}
            productId={result.secondary}
            shopLabel={t.result_shop_now}
            reasonLabel={t.result_reason_label}
          />
        </div>
      </div>

      {/* Floating retake button — always visible at bottom */}
      <div className="px-5 py-4 border-t border-stone-100 bg-white">
        <button
          onClick={onRetake}
          className="w-full py-3.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-500 hover:bg-stone-50 active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          {t.result_retake}
        </button>
      </div>
    </div>
  );
}

// ─── Product card ────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  productId: ProductId;
  shopLabel: string;
  reasonLabel: string;
  isPrimary?: boolean;
}

function ProductCard({
  product,
  productId,
  shopLabel,
  reasonLabel,
  isPrimary = false,
}: ProductCardProps) {
  const { t } = useLanguage();

  // Look up translated reason via message key: reason_<productId>
  const reasonKey = `reason_${productId}` as keyof typeof t;
  const translatedReason = (t[reasonKey] as string) ?? product.reason;

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
        isPrimary ? "border-stone-200 shadow-md" : "border-stone-100 bg-stone-50"
      }`}
    >
      {/* Product image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: isPrimary ? 200 : 140 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
        />
        {isPrimary && (
          <div className="absolute top-3 left-3 bg-stone-800 text-white text-xs px-2.5 py-1 rounded-full tracking-wide">
            #1 Pick
          </div>
        )}
      </div>

      {/* Product info */}
      <div className={`p-4 ${isPrimary ? "bg-white" : ""}`}>
        <p className="text-xs text-stone-400 tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3
          className={`font-medium text-stone-800 mb-3 ${
            isPrimary ? "text-base" : "text-sm"
          }`}
        >
          {product.name}
        </h3>

        {/* Translated reason */}
        <div className="mb-4 px-3 py-2.5 bg-stone-50 rounded-xl">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
            {reasonLabel}
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">{translatedReason}</p>
        </div>

        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98] ${
            isPrimary
              ? "bg-stone-800 text-white hover:bg-stone-700 shadow-sm"
              : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          {shopLabel}
        </a>
      </div>
    </div>
  );
}
