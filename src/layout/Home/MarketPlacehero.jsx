import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

const MarketplaceHero = () => {
  return (
    <section className="w-full bg-background text-foreground border-b py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <Badge className="mb-4" variant="secondary">
              Healthy • Proof-Verified Foods
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Eat confidently. <br />
              <span className="text-emerald-600">
                Every product is verified.
              </span>
            </h1>

            <p className="mt-4 text-muted-foreground max-w-lg">
              A curated marketplace of packaged foods approved through strict ingredient rules, verified proofs, and clear health goals.
            </p>

            <div className="flex gap-4 mt-6">
              <Link to="/shop">
                <Button className="h-12 px-6 inline-flex items-center gap-2">
                  Explore Products <ArrowRight size={18} />
                </Button>
              </Link>

              <Link to="/how-it-works">
                <Button
                  variant="outline"
                  className="h-12 px-6 inline-flex items-center"
                >
                  How We Verify Food
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-xl overflow-hidden border bg-muted">
            <img
              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1400&q=80"
              alt="Healthy packaged food ingredients"
              className="w-full h-[260px] md:h-[320px] object-cover"
            />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default MarketplaceHero;
