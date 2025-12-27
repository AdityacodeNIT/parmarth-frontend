import {
  Apple,
  Coffee,
  Droplets,
  Wheat,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";

const categories = [
  { name: "Healthy Snacks", slug: "snacks", icon: Apple },
  { name: "Beverages", slug: "beverages", icon: Coffee },
  { name: "Low Sugar Choices", slug: "low-sugar", icon: Droplets },
  { name: "High Fiber Foods", slug: "high-fiber", icon: Wheat },
  { name: "Daily Essentials", slug: "essentials", icon: Package },
];

const CategorySection = () => {
  return (
    <section className="py-14 bg-background text-foreground">
      <Container>
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Browse categories
          </h2>
          <p className="text-muted-foreground mt-1">
            Thoughtfully curated for healthier everyday choices
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background px-4 py-6
                           no-underline! text-foreground!
                           transition-all hover:border-primary/40 hover:bg-muted/40
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="rounded-lg border p-3 transition-colors group-hover:bg-primary/10">
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>

                <span className="text-sm font-medium">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
