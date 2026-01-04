import { useEffect, useState } from "react";

export default function WhyHealthy({ nutrition, dietary }) {
  const [aiText, setAiText] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nutrition) return;

    const controller = new AbortController();

    async function generateAIExplanation() {
      setLoading(true);

      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `
You are a nutrition expert.
Explain health benefits conservatively and factually.
No marketing language.
No medical claims.
No exaggeration.

Nutrition values:
Protein: ${nutrition.protein} g
Fibre: ${nutrition.fibre} g
Sugar: ${nutrition.sugar} g
Calories: ${nutrition.calories}
Sodium: ${nutrition.sodium} mg

Dietary flags:
Vegan: ${dietary?.isVegan}
Sugar free: ${dietary?.isSugarFree}

Explain in 3–4 short bullet points why this product may be considered a healthy choice for general consumption.
                      `,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.25,
                maxOutputTokens: 200,
              },
            }),
          }
        );

        const data = await res.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          setAiText(text.trim());
        }
      } catch (err) {
        // Silent fallback
      } finally {
        setLoading(false);
      }
    }

    generateAIExplanation();
    return () => controller.abort();
  }, [nutrition, dietary]);

  /* ---------- FALLBACK (original logic preserved) ---------- */

  const fallbackReasons = [];

  if (nutrition?.protein >= 10)
    fallbackReasons.push("High protein supports satiety and muscle recovery.");

  if (nutrition?.fibre >= 8)
    fallbackReasons.push("High fibre improves digestion and gut health.");

  if (nutrition?.sugar <= 5)
    fallbackReasons.push("Low sugar helps maintain stable blood glucose levels.");

  if (dietary?.isVegan)
    fallbackReasons.push("Plant-based and suitable for vegan diets.");

  if (!aiText && fallbackReasons.length === 0) return null;

  return (
    <section className="rounded-2xl border p-6 bg-muted/30">
      <h2 className="text-xl font-semibold mb-3">
        Why this is a healthy choice
      </h2>

      {loading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Generating health insights…
        </p>
      )}

      {!loading && aiText && (
        <div className="text-sm text-muted-foreground whitespace-pre-line">
          {aiText}
        </div>
      )}

      {!loading && !aiText && (
        <ul className="list-disc list-inside text-sm space-y-1">
          {fallbackReasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
