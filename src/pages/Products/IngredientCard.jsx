import { motion } from "framer-motion";

const IngredientCard = ({ name, description }) => (
  <motion.div
    whileHover={{ rotateY: 180 }}
    transition={{ duration: 0.6 }}
    className="relative h-40 w-full cursor-pointer
               [transform-style:preserve-3d]"
  >
    <div className="absolute inset-0 bg-white rounded-xl shadow-sm
                    flex items-center justify-center backface-hidden">
      <span className="font-medium text-emerald-700">{name}</span>
    </div>

    <div className="absolute inset-0 bg-emerald-50 rounded-xl shadow-sm
                    p-4 text-sm text-slate-700 rotateY-180 backface-hidden">
      {description}
    </div>
  </motion.div>
);

export default function IngredientFlipGrid({ ingredients }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {ingredients.map((i, idx) => (
        <IngredientCard key={idx} {...i} />
      ))}
    </div>
  );
}
