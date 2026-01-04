const BASELINES = {
  "Healthy Snacks": { sugar: 12, protein: 6 },
  "Beverages": { sugar: 18, protein: 3 },
  "Low Sugar Choices": { sugar: 5, protein: 7 },
  "High Fibre Foods": { sugar: 8, protein: 8 },
  "Daily Essentials": { sugar: 10, protein: 6 },
};

export default function NutritionCompare({ nutrition, category }) {
  if (!nutrition || !BASELINES[category]) return null;

  const base = BASELINES[category];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Compared to similar products
      </h2>

      <ul className="space-y-2 text-sm">
        <li>
          Sugar: {nutrition.sugar}g vs avg {base.sugar}g
        </li>
        <li>
          Protein: {nutrition.protein}g vs avg {base.protein}g
        </li>
      </ul>
    </section>
  );
}
