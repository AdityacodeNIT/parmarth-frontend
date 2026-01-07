import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { productAPI } from "@/api/productAPi";

export default function WhyHealthy({ productId, nutrition, dietary }) {
  const [aiText, setAiText] = useState(null);
  const [loading, setLoading] = useState(false);

  const flatNutrition = {
    calories: nutrition?.energy?.calories ?? 0,
    protein: nutrition?.macros?.protein ?? 0,
    fibre: nutrition?.macros?.fibre ?? 0,
    sugar: nutrition?.macros?.sugar ?? 0,
    sodium: nutrition?.micros?.minerals?.sodium ?? 0,
  };

  useEffect(() => {
    if (!productId) return;

    const controller = new AbortController();

    async function fetchAIExplanation() {
      setLoading(true);
      try {
        const res = await productAPI.getWhyHealthyAI(productId, controller.signal);

        if (res.data?.text) {
          setAiText(res.data.text);
        }
      } catch (err) {
        // silent fallback
      } finally {
        setLoading(false);
      }
    }

    fetchAIExplanation();
    return () => controller.abort();
  }, [productId]);

  /* ───────── FALLBACK (SOFT, GEN-Z SAFE) ───────── */

  const fallbackReasons = [];

  if (flatNutrition.protein >= 10)
    fallbackReasons.push("Contains a noticeable amount of protein.");

  if (flatNutrition.fibre >= 8)
    fallbackReasons.push("Includes fibre commonly found in balanced diets.");

  if (flatNutrition.sugar <= 5)
    fallbackReasons.push("Sugar content is relatively low.");

  if (dietary?.isVegan)
    fallbackReasons.push("Fits plant-based food preferences.");

  if (!aiText && fallbackReasons.length === 0) return null;

  return (
    <section className="rounded-2xl border bg-background p-5 space-y-3">
      
      
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles size={16} className="text-primary" />
        <span>Why people consider this</span>
      </div>


      {/* Loading */}
      {loading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Breaking down the nutrition…
        </p>
      )}

      {!loading && aiText && (
        <p className="text-sm leading-relaxed text-foreground/90">
          {aiText}
        </p>
      )}


      {!loading && !aiText && (
        <div className="space-y-1">
          {fallbackReasons.map((reason, i) => (
            <p
              key={i}
              className="text-sm text-foreground/80 leading-relaxed"
            >
              {reason}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
