import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { fetchProducts } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Reminder from "../Reminder.jsx";
import { CardContent,CardHeader,CardFooter, CardTitle,Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";


const ProductList = () => {
  const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
const category = searchParams.get("category");

  useEffect(() => {
    dispatch(fetchProducts({category}));
  }, [dispatch]);

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
          <p className="text-lg md:text-xl text-gray-100  mx-auto p-8">
            Explore our exclusive collection of top-notch products curated just for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="  rounded-xl h-64" />
                <div className="mt-3 h-4  rounded" />
                <div className="mt-2 h-4  rounded-smw-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-100 dark:bg-error-900 mb-4">
              <svg className="w-8 h-8 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold  mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
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
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <span>
                {product.rating} 
              </span>
            </div>
          )} 
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col items-start px-4 pb-4">
          <p className="text-lg font-bold text-primary">
            ₹{product.price}
          </p>
          {/* {product.originalPrice && (
            <p className="text-xs line-through text-muted-foreground">
              ₹{product.originalPrice}
            </p>
          )} */}
        </CardFooter>

      </Card>
    </Link>
  ))}
</div>

        )}

        {/* Empty State */}
        {!loading && !error && productsData.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100  mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
