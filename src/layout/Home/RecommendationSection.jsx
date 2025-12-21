import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";


const RecommendationSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/activity/recommendations`
        );

        if (!res.ok) {
          throw new Error("API error");
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load Recommendation products", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <section className="py-16 bg-background text-foreground">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recommendations
          </h2>
          <Badge variant="primary">You will also like</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Loading */}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="h-64 animate-pulse bg-background"
              />
            ))}

          {/* Error */}
          {!loading && error && (
            <p className="col-span-full text-sm text-muted-foreground">
              Recommended products are unavailable right now.
            </p>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              No recommended products yet.
            </p>
          )}

          {/* Success */}
          {!loading &&
            !error &&
            products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="block no-underline text-foreground"
              >
                <Card className="p-4 h-full cursor-pointer hover:shadow-sm transition">
                  <img
                    src={product.ProductImage}
                    alt={product.title}
                    className="h-36 w-full object-contain mb-4"
                  />

                  <h3 className="text-sm font-medium line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="mt-2 font-semibold">
                    ₹{product.price}
                  </p>
                </Card>
              </Link>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default RecommendationSection;
