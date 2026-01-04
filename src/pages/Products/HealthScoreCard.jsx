export default function HealthScoreCard({ nutrition }) {
  if (!nutrition) return null;

  let score = 0;

  if (nutrition.protein >= 10) score += 25;
  else if (nutrition.protein >= 5) score += 15;

  if (nutrition.fibre >= 8) score += 20;
  else if (nutrition.fibre >= 4) score += 10;

  if (nutrition.sugar <= 5) score += 25;
  else if (nutrition.sugar <= 10) score += 15;

  if (nutrition.sodium <= 200) score += 15;
  else if (nutrition.sodium <= 400) score += 8;

  if (nutrition.calories <= 250) score += 15;
  else if (nutrition.calories <= 400) score += 8;

  score = Math.min(score, 100);

  const label =
    score >= 80 ? "Excellent" :
    score >= 60 ? "Good" :
    score >= 40 ? "Moderate" : "Poor";

  return (
    <div className="rounded-3xl border p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">Health score</p>
        <p className="text-xs text-muted-foreground">
          Derived from nutrition balance
        </p>
      </div>

      <div className="text-right">
        <div className="text-4xl font-bold text-emerald-600">
          {score}
        </div>
        <div className="text-sm text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
