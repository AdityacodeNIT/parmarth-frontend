import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../features/cart/cartSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";
import {
  fetchReviewsByProduct,
  selectReviewsByProduct,
  submitReview
} from "../../features/review/reviewSlice";
import { fetchProductById } from "../../features/product/productSlice";
import { addWishlistItem } from "@/features/wishlist/wishlistslice";

import { Button } from "@/components/ui/button";
import ProductReviews from "./ProductReviews";
import ProductGallery from "./ProductGallery";

/* ───────── AI / Health Components ───────── */
import HealthScoreCard from "./HealthScoreCard";
// CHANGED: Imported the new component
import NutrientCard from "./NutrientBar"; 
import WhyHealthy from "./WhyHealthy";
import NutritionCompare from "./NutritionCompare";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const product = useSelector((state) => state.product.currentProduct);
  const wishlist = useSelector((state) => state.wishlist.items);

  const reviews = useSelector((state) =>
    selectReviewsByProduct(state, productId)
  );

  const isWishlisted = wishlist.some(
    (item) => item.productId?._id === productId
  );

  const hasReviewed = reviews.some(
    (r) => r.userId?._id === userId
  );

  const [quantity, setQuantity] = useState(1);
  const [reviewDraft, setReviewDraft] = useState({
    rating: 0,
    message: ""
  });
  const [page, setPage] = useState(1);

  const reviewsPerPage = 5;
  const currentReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductById(productId));
    dispatch(fetchReviewsByProduct(productId));
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  const images = [
    product.ProductImage,
    ...(product.images || []),
  ].filter(Boolean);

  /* ───────── DATA TRANSFORMATION FOR NUTRIENT CARD ───────── */
  // We map the raw product data to the format the new design expects
  const nutrition = product.nutrition || {};
  
  const nutrientCardData = {
    productName: product.name,
    calories: nutrition.calories || 0,
    nutriScore: product.nutriScore || "A", // Fallback if not in DB
    healthGrade: product.healthGrade || "Excellent",
    
    macros: [
      { 
        label: "Protein", 
        value: `${nutrition.protein || 0}g`, 
        // Simple calculation for visual bar length (assuming 50g is 'full' bar)
        percentage: Math.min(((nutrition.protein || 0) / 50) * 100, 100), 
        color: "bg-blue-500" 
      },
      { 
        label: "Carbs", 
        value: `${nutrition.carbohydrates || 0}g`, 
        percentage: Math.min(((nutrition.carbohydrates || 0) / 300) * 100, 100),
        color: "bg-orange-400" 
      },
      { 
        label: "Fiber", 
        value: `${nutrition.fiber || 0}g`, 
        percentage: Math.min(((nutrition.fiber || 0) / 30) * 100, 100),
        color: "bg-blue-400" 
      },
      { 
        label: "Fats", 
        value: `${nutrition.fat || 0}g`, 
        percentage: Math.min(((nutrition.fat || 0) / 70) * 100, 100),
        color: "bg-orange-400" 
      },
    ],
    
    micros: [
      { label: "Vitamin C", value: `${nutrition.vitaminC || 0}%`, active: (nutrition.vitaminC > 0) },
      { label: "Iron", value: `${nutrition.iron || 0}%`, active: (nutrition.iron > 0) },
      { label: "Calcium", value: `${nutrition.calcium || 0}%`, active: (nutrition.calcium > 0) },
      { label: "Potassium", value: `${nutrition.potassium || 0}%`, active: (nutrition.potassium > 0) },
    ],

    // Map dietary tags (e.g., "Gluten Free") to benefits
    benefits: product.dietary?.map(tag => ({ label: tag })) || [
      { label: "Healthy Choice" }, // Fallback
      { label: "Nutrient Dense" }
    ]
  };
  /* ───────── END TRANSFORMATION ───────── */


  return (
    <div className="min-h-screen bg-background text-foreground px-4 md:px-8 py-10 max-w-7xl mx-auto">

      {/* ───────── HERO SECTION ───────── */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <ProductGallery images={images} name={product.name} />

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            {product.Category}
            {product.brand && ` · ${product.brand}`}
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i + 1 <= Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-emerald-600">
            ₹{product.discountedPrice ?? product.price}
          </div>

          {/* Stock */}
          {product.isLowStock && (
            <div className="text-sm text-orange-500">
              Low stock available
            </div>
          )}

          {!product.inStock && (
            <div className="text-sm text-red-500">
              Out of stock
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={quantity <= 1}
              onClick={() => setQuantity(q => q - 1)}
            >
              −
            </Button>
            <span>{quantity}</span>
            <Button
              variant="outline"
              disabled={quantity >= product.stocks}
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              disabled={!product.inStock}
              onClick={() =>
                dispatch(addToCart({ ...product, quantity }))
              }
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="secondary"
              disabled={!product.inStock}
              onClick={() => {
                dispatch(setOrderFromBuyNow({ product, quantity }));
                navigate("/BuyProduct");
              }}
            >
              Buy Now
            </Button>
          </div>

          {/* Wishlist */}
          <button
            onClick={() =>
              userId && dispatch(addWishlistItem(product._id))
            }
            className={`flex items-center gap-2 mt-2 ${
              isWishlisted
                ? "text-muted-foreground"
                : "text-red-500"
            }`}
          >
            <FaHeart />
            {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* ───────── AI HEALTH INTELLIGENCE ───────── */}
      <div className="space-y-14 mb-20">
        <HealthScoreCard nutrition={product.nutrition} />

        {/* CHANGED: Passing the transformed data to the new card */}
        <NutrientCard {...nutrientCardData} />

        <WhyHealthy
          nutrition={product.nutrition}
          dietary={product.dietary}
        />

        <NutritionCompare
          nutrition={product.nutrition}
          category={product.Category}
        />
      </div>

      {/* ───────── INGREDIENTS & ALLERGENS ───────── */}
      {(product.ingredients?.length > 0 ||
        product.allergens?.length > 0) && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">
            Ingredients & Safety
          </h2>

          {product.ingredients?.length > 0 && (
            <p className="mb-2 text-muted-foreground">
              Ingredients: {product.ingredients.join(", ")}
            </p>
          )}

          {product.allergens?.length > 0 && (
            <p className="text-red-500 text-sm">
              Allergens: {product.allergens.join(", ")}
            </p>
          )}
        </section>
      )}

      {/* ───────── STORAGE & SERVING ───────── */}
      {product.foodInfo && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">
            Storage & Serving
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {product.foodInfo.shelfLife && (
              <div>Shelf life: {product.foodInfo.shelfLife}</div>
            )}
            {product.foodInfo.storageInstructions && (
              <div>
                Storage: {product.foodInfo.storageInstructions}
              </div>
            )}
            {product.foodInfo.servingSize && (
              <div>
                Serving size: {product.foodInfo.servingSize}
              </div>
            )}
            {product.foodInfo.servingsPerPack && (
              <div>
                Servings per pack:{" "}
                {product.foodInfo.servingsPerPack}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ───────── REVIEWS ───────── */}
      <ProductReviews
        reviews={currentReviews}
        avg={product.rating}
        count={product.reviewCount}
        reviewDraft={reviewDraft}
        setReviewDraft={setReviewDraft}
        onSubmit={async () => {
          if (!reviewDraft.rating || !reviewDraft.message)
            return;
          await dispatch(
            submitReview({ productId, ...reviewDraft })
          ).unwrap();
          dispatch(fetchReviewsByProduct(productId));
          setReviewDraft({ rating: 0, message: "" });
        }}
        currentPage={page}
        totalPages={Math.ceil(
          reviews.length / reviewsPerPage
        )}
        hasReviewed={hasReviewed}
        onPrev={() => setPage(p => p - 1)}
        onNext={() => setPage(p => p + 1)}
      />
    </div>
  );
};

export default Product;