import { PenTool, Notebook, Folder, Package, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";


const categories = [
  { name: "Writing", slug: "Writing", icon: PenTool },
  { name: "Notebooks", slug: "Paper", icon: Notebook },
  { name: "Storage", slug: "Filling", icon: Folder },
  { name: "Office Supplies", slug: "DeskSupplies", icon: Package },
  { name: "Reusable", slug: "Reusable", icon: Recycle },
];

const CategorySection = () => {

  return (
    <section className="py-14  bg-background text-foreground">
      <Container>
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Browse categories
          </h2>
          <p className="text-muted-foreground mt-1">
            Designed for productivity, built for speed
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
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

                <span className="text-sm font-medium no-underline">
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
