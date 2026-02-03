import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, selectShouldRefetchProducts } from "../../features/product/productSlice";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Reminder from "../Reminder.jsx";
import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";

/* 🔹 SLUG → DB CATEGORY MAP (VERY IMPORTANT) */
const categoryMap = {
  "snacks": "Healthy Snacks",
  "beverages": "Beverages",
  "low-sugar": "Low Sugar Choices",
  "high-fiber": "High Fibre Foods",
  "essentials": "Daily Essentials",
};

const ProductList = () => {
  const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector(
    (state) => state.product
  );
  
  // Smart cache checking
  const shouldRefetch = useSelector(selectShouldRefetchProducts);

  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  // Convert slug → DB value
  const category = categorySlug ? categoryMap[categorySlug] : undefined;

  /* ✅ Smart caching: Only fetch if cache is expired */
  useEffect(() => {
    if (shouldRefetch) {
      console.log('🔄 Cache expired, fetching fresh products...');
      dispatch(fetchProducts({ category }));
    } else {
      console.log('✅ Using cached products');
    }
  }, [dispatch, category, shouldRefetch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Reminder />

      {/* Hero Banner */}
      <section className="relative bg-linear-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mx-auto p-8">
            Explore our exclusive collection of top-notch products curated just
            for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Loading */}
        {loading && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-xl h-64 bg-muted" />
                <div className="mt-3 h-4 bg-muted rounded" />
                <div className="mt-2 h-4 bg-muted w-2/3 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && productsData.length > 0 && (
          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productsData.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                state={product}
                className="h-full"
              >
                <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <CardHeader className="p-3">
                    <div className="relative aspect-3/4 rounded-lg overflow-hidden">
                      <img
                        src={product.ProductImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="flex-1 px-4">
                    <CardTitle className="text-sm md:text-base line-clamp-2 min-h-[40px]">
                      {product.name}
                    </CardTitle>

                    {product.rating && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <span>{product.rating}</span>
                      </div>
                    )}
                  </CardContent>

                  {/* Footer */}
                  <CardFooter className="flex flex-col items-start px-4 pb-4">
                    <p className="text-lg font-bold text-primary">
                      ₹{product.price}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && productsData.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Check back later for new products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
